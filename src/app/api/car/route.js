import connectDB from "../../../lib/db";
import Car from "../../../models/Cars";
import CarDetails from "../../../models/CarDetails";
import Partner from "../../../models/Partner";
import Transaction from "../../../models/Transaction";
import Invoice from "../../../models/Invoice";
import Installment from "../../../models/Installment";
import { NextResponse } from "next/server";
import { CoPresentOutlined } from "@mui/icons-material";

// Create a new car and its details
export async function POST(req, res) {
  // Connect to the database
  await connectDB();
  const {
    name,
    color,
    model,
    chassisNumber,
    owner,
    purchaseDetails,
    entryDate,
    maintenance,
    currentLocation,
    value,
    partners,
    firstInstallment,
  } = await req.json();
  try {
    const carExists = await Car.findOne({
      chassisNumber,
      location: { $ne: "Sold" },
    });

    if (carExists) {
      return NextResponse.json(
        { error: "Car already exists", carExists },
        { status: 400 }
      );
    }

    // Create a new car instance
    const car = new Car({
      name,
      color,
      model,
      chassisNumber,
      owner,
      purchaseDetails,
      entryDate,
      maintenance,
      currentLocation,
    });

    // Save the car to the database
    await car.save();

    // Create a corresponding car details entry
    const carDetails = new CarDetails({
      car: car._id, // Reference to the newly created car
      value: value, // Set default values for other fields
      sellingPrice: 0,
      capital: 0,
      maintenanceCosts: 0,
      netProfit: 0,
    });

    // Save the car details to the database
    await carDetails.save();

    const firstInstallmentRecord = new Installment({
      amount: firstInstallment, // Set the amount of the first installment equal to the value of the car
      description: "First Installment", // Optional description
      car: car._id,
    });

    // Save the first installment to the database
    await firstInstallmentRecord.save();

    const invoices = []; // Array to store associated invoices

    // Calculate the total amount to be paid by all partners
    const totalAmount = value;
    
    // Loop through partnerData
    for (const partner of partners) {
      // Check if partner with given phone number exists
      let existingPartner = await Partner.findOne({
        "contactInfo.phone": partner.phone,
      });

      // If partner doesn't exist, create new partner
      if (!existingPartner) {
        const newPartner = new Partner({
          name: partner.name,
          type: partner.type,
          contactInfo: {
            email: partner.email,
            phone: partner.phone,
            address: {
              street: "",
              city: "",
              state: "",
              country: "",
              zipCode: "",
            },
          },
          partnershipPercentage: partner.percentage,
          cars: [car._id], // Associate the partner with the newly created car
        });
        await newPartner.save();
        // Calculate the amount this partner needs to pay based on their percentage
        const partnerAmount = (partner.percentage / 100) * totalAmount;

        // Create a transaction for the amount this partner is paying
        const partnerTransaction = new Transaction({
          type: "income",
          amount: partnerAmount,
          description: `Payment from partner ${partner.name} for the purchase of car with chassis number ${chassisNumber}`,
          car: car._id,
          partner: newPartner._id,
        });

        await partnerTransaction.save();
        // Create an invoice for this partner
        const partnerInvoice = new Invoice({
          transaction: partnerTransaction._id,
          customerType: "Partner",
          customer: newPartner._id,
          invoiceDate: new Date(),
          totalAmount: partnerAmount,
        });

        await partnerInvoice.save();
        invoices.push(partnerInvoice); // Push the invoice to the invoices array
      } else {
        // If partner exists, push the car to their list of associated cars
        existingPartner.cars.push(car._id);
        await existingPartner.save();
      }
    }

    // Determine the purchase amount based on the first installment
    const purchaseAmount = Math.min(firstInstallment, value);

    // Create a transaction for the purchase amount
    const purchaseTransaction = new Transaction({
      type: "expense",
      amount: purchaseAmount,
      description: `Purchase of car with chassis number ${chassisNumber}`,
      car: car._id,
    });

    await purchaseTransaction.save();

    // Create an invoice for the purchase transaction
    const purchaseInvoice = new Invoice({
      transaction: purchaseTransaction._id,
      customerType: "Car",
      customer: car._id,
      invoiceDate: new Date(),
      totalAmount: purchaseAmount,
    });

    await purchaseInvoice.save();
    invoices.push(purchaseInvoice); // Push the purchase invoice to the invoices array

    // Return success response with the created car and associated invoices
    return NextResponse.json({ message: "Car created successfully", car, invoices });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json(
      { error: "Could not create car: " + error.message },
      { status: 500 }
    );
  }
}


// Get all cars with pagination and filters
export async function GET(req, res) {
  // Connect to the database
  await connectDB();
  try {
    // Parse query parameters
    const searchParams = new URL(req.url).searchParams;
    let { page = 1, perPage = 10 } = Object.fromEntries(searchParams.entries());
    const name = searchParams.get("name");
    const color = searchParams.get("color");
    const model = searchParams.get("model");
    const chassisNumber = searchParams.get("chassisNumber");

    // Convert to integers
    page = parseInt(page);
    perPage = parseInt(perPage);

    // Define the filter object
    const filter = {};
    if (name) filter.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    if (color) filter.color = { $regex: new RegExp(color, "i") };
    if (model) filter.model = { $regex: new RegExp(model, "i") };
    if (chassisNumber)
      filter.chassisNumber = { $regex: new RegExp(chassisNumber, "i") };

    // Calculate skip value for pagination
    const skip = (page - 1) * perPage;

    // Query cars with pagination and filters
    const cars = await Car.find(filter).skip(skip).limit(perPage);

    // Get total count of cars (without pagination)
    const totalCount = await Car.countDocuments(filter);

    return NextResponse.json({ cars, totalCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not retrieve cars: " + error.message },
      { status: 500 }
    );
  }
}
