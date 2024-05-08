import connectDB from "../../../lib/db";
import Car from "../../../models/Cars";
import Transaction from "../../../models/Transaction";
import Customer from "../../../models/Customer";
import CarDetails from "../../../models/CarDetails";
import MaintenanceTask from "../../../models/MaintenanceTasks";
import SoldCar from "../../../models/SoldCars";
import Partner from "../../../models/Partner"; // Import the Partner model
import { NextResponse } from "next/server";
import moment from "moment"; // Import moment.js library for date manipulation

export async function GET(req, { params }) {
  await connectDB();
  const today = req.nextUrl.searchParams.get("today");
  try {
    let filter = {};

    if (today === "true") {
      const today = moment().startOf("day");
      const tomorrow = moment(today).endOf("day");
      filter = { createdAt: { $gte: today.toDate(), $lt: tomorrow.toDate() } };
    }

    // Define promises to fetch data asynchronously
    const totalCarsPromise = Car.countDocuments(filter);
    const totalTransactionsPromise = Transaction.countDocuments(filter);
    const totalCustomersPromise = Customer.countDocuments(filter);
    const totalSoldCarsPromise = SoldCar.countDocuments(filter);
    const totalMaintenanceCostsPromise = MaintenanceTask.aggregate([
      { $match: filter },
      { $group: { _id: null, totalCost: { $sum: "$taskCost" } } },
    ]);
    const totalCustomerDebtPromise = Customer.aggregate([
      { $match: filter },
      { $group: { _id: null, totalDebt: { $sum: "$debts" } } },
    ]);
    const carDetailsPromise = CarDetails.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalValue: { $sum: "$value" },
          totalSellingPrice: { $sum: "$sellingPrice" },
          totalCapital: { $sum: "$capital" },
          totalProfit: { $sum: "$netProfit" },
        },
      },
    ]);
    const recentTransactionsPromise = Transaction.find(filter).sort({ createdAt: -1 }).limit(5);

    // Execute promises concurrently
    const [
      totalCars,
      totalTransactions,
      totalCustomers,
      totalSoldCars,
      totalMaintenanceCosts,
      totalCustomerDebt,
      carDetails,
      recentTransactions
    ] = await Promise.all([
      totalCarsPromise,
      totalTransactionsPromise,
      totalCustomersPromise,
      totalSoldCarsPromise,
      totalMaintenanceCostsPromise,
      totalCustomerDebtPromise,
      carDetailsPromise,
      recentTransactionsPromise
    ]);

    // Calculate total received and total expenses
    let totalReceived = 0;
    let totalExpenses = 0;
    recentTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalReceived += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
      }
    });

    // Fetch partners and calculate total percentages
    const partners = await Partner.find({});
    const totalPartners = partners.length;
    const totalPartnerPercentage = partners.reduce((acc, partner) => acc + partner.partnershipPercentage, 0);

    const response = {
      totalCars,
      totalTransactions,
      totalCustomers,
      totalMaintenanceCosts: totalMaintenanceCosts[0]?.totalCost || 0,
      totalCustomerDebt: totalCustomerDebt[0]?.totalDebt || 0,
      carDetails: carDetails[0] || {},
      totalSoldCars,
      recentTransactions,
      totalReceived,
      totalExpenses,
      totalPartners, // Add total partners
      totalPartnerPercentage, // Add total partner percentage
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