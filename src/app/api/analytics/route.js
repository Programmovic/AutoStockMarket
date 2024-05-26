import connectDB from "../../../lib/db";
import Car from "../../../models/Cars";
import Transaction from "../../../models/Transaction";
import Customer from "../../../models/Customer";
import CarDetails from "../../../models/CarDetails";
import MaintenanceTask from "../../../models/MaintenanceTasks";
import SoldCar from "../../../models/SoldCars";
import Partner from "../../../models/Partner";
import { NextResponse } from "next/server";
import moment from "moment";

export async function GET(req, { params }) {
  await connectDB();

  let startDate, endDate;
  const month = req.nextUrl.searchParams.get("month");

  if (month) {
    startDate = moment()
      .month(month - 1)
      .startOf("month")
      .toDate();
    endDate = moment()
      .month(month - 1)
      .endOf("month")
      .toDate();
  } else {
    startDate = moment().startOf("month").toDate();
    endDate = moment().endOf("month").toDate();
  }

  const filter = { createdAt: { $gte: startDate, $lt: endDate } };

  try {
    // Define promises to fetch data asynchronously
    const totalCarsPromise = Car.find(filter);
    const totalTransactionsPromise = Transaction.find(filter);
    const totalCustomersPromise = Customer.find(filter);
    const totalSoldCarsPromise = SoldCar.find(filter);
    const totalMaintenanceCostsPromise = MaintenanceTask.aggregate([
      { $match: filter },
      { $group: { _id: null, totalCost: { $sum: "$taskCost" } } },
    ]);
    const totalCustomerDebtPromise = Customer.aggregate([
      { $match: filter },
      { $group: { _id: null, totalDebt: { $sum: "$debts" } } },
    ]);
    const carDetailsPromise = CarDetails.find(filter);
    const recentTransactionsPromise = Transaction.find(filter)
      .sort({ createdAt: -1 })
      .limit(5);
    const totalSellingPricesPromise = SoldCar.aggregate([
      { $match: filter },
      { $group: { _id: null, totalSellingPrices: { $sum: "$purchasePrice" } } },
    ]);
    // Execute promises concurrently
    const [
      cars,
      transactions,
      customers,
      soldCars,
      totalMaintenanceCosts,
      totalCustomerDebt,
      carDetails,
      recentTransactions,
      totalSellingPrices
    ] = await Promise.all([
      totalCarsPromise,
      totalTransactionsPromise,
      totalCustomersPromise,
      totalSoldCarsPromise,
      totalMaintenanceCostsPromise,
      totalCustomerDebtPromise,
      carDetailsPromise,
      recentTransactionsPromise,
      totalSellingPricesPromise
    ]);

    // Calculate total received and total expenses
    let totalReceived = 0;
    let totalExpenses = 0;
    const transactionAmounts = transactions.map((transaction) => {
      if (transaction.type === "income") {
        totalReceived += transaction.amount;
        return transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpenses += transaction.amount;
        return transaction.amount;
      }
    });

    // Fetch partners and calculate total percentages
    const partners = await Partner.find({});
    const totalPartners = partners.length;
    const totalPartnerPercentage = partners.reduce(
      (acc, partner) => acc + partner.partnershipPercentage,
      0
    );

    // Extract car values for chart visualization
    const carValues = carDetails.map((car) => car.value);
    // Extract car values for chart visualization
    const carValuesAmount = carDetails
      .map((car) => car.value)
      .reduce((partialSum, a) => partialSum + a, 0);
    // Group transactions by month and calculate earnings and expenses
    const monthlyTransactions = await Transaction.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          earnings: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          expenses: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const response = {
      totalCars: cars.length,
      cars,
      totalTransactions: transactions.length,
      transactions,
      totalCustomers: customers.length,
      customers,
      totalMaintenanceCosts: totalMaintenanceCosts[0]?.totalCost || 0,
      totalCustomerDebt: totalCustomerDebt[0]?.totalDebt || 0,
      carDetails: carDetails[0] || {},
      carValues,
      carValuesAmount,
      totalSoldCars: soldCars.length,
      soldCars,
      recentTransactions,
      totalReceived,
      totalExpenses,
      totalPartners,
      totalPartnerPercentage,
      earnings: recentTransactions
        .filter((tr) => tr.type === "income")
        .map((tr) => tr.amount),
      expenses: recentTransactions
        .filter((tr) => tr.type === "expense")
        .map((tr) => tr.amount),
      transactionAmounts,
      monthlyTransactions, // Add monthly transactions data
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not retrieve dashboard data: " + error.message },
      { status: 500 }
    );
  }
}
