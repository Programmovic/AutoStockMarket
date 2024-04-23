import connectDB from "../../../lib/db";
import Customer from "../../../models/Customer";
import { NextResponse } from "next/server";

// Connect to the database
connectDB();

// Create a new customer
export async function POST(req, res) {
  const { name, contactDetails, debts } = await req.json();
  try {
    // Create a new customer instance
    const customer = new Customer({
      name,
      contactDetails,
      debts,
    });

    // Save the customer to the database
    await customer.save();

    // Return a success message
    return NextResponse.json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json(
      { error: "Could not create customer: " + error.message },
      { status: 500 }
    );
  }
}

// Get all customers with pagination and filters
export async function GET(req, res) {
  try {
    // Parse query parameters
    const searchParams = new URL(req.url).searchParams;
    let { page = 1, perPage = 10 } = Object.fromEntries(searchParams.entries());
    const name = searchParams.get("name");
    const contactDetails = searchParams.get("contactDetails");

    // Convert to integers
    page = parseInt(page);
    perPage = parseInt(perPage);

    // Define the filter object
    const filter = {};
    if (name) filter.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    if (contactDetails)
      filter.contactDetails = { $regex: new RegExp(contactDetails, "i") };

    // Calculate skip value for pagination
    const skip = (page - 1) * perPage;

    // Query customers with pagination and filters
    const customers = await Customer.find(filter).skip(skip).limit(perPage);

    // Get total count of customers (without pagination)
    const totalCount = await Customer.countDocuments(filter);

    return NextResponse.json({ customers, totalCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not retrieve customers: " + error.message },
      { status: 500 }
    );
  }
}
