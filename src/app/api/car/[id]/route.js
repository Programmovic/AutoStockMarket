import connectDB from "../../../../lib/db";
import Car from "../../../../models/Cars";
import CarDetails from "../../../../models/CarDetails";
import Customer from "../../../../models/Customer";
import { NextResponse } from "next/server";

// Add extra data to car by ID
export async function POST(req, { params }) {
  // Connect to the database
  await connectDB();
  const { id } = params;
  const extraData = req.body;

  try {
    // Check if the car exists
    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Create new car details with extra data
    const newCarDetails = new CarDetails({
      car: id,
      ...extraData,
    });

    // Save the new car details
    await newCarDetails.save();

    return NextResponse.json({
      message: "Extra data added to car successfully",
      carDetails: newCarDetails,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not add extra data to car: " + error.message },
      { status: 500 }
    );
  }
}


// Retrieve car and customers details by their IDs
export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Connect to the database
    await connectDB();

    // Find the car by ID
    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Find the car details associated with the car
    const carDetails = await CarDetails.findOne({ car: car._id });
    if (!carDetails) {
      return NextResponse.json(
        { error: "Car details not found" },
        { status: 404 }
      );
    }

    // Find the customers
    const customers = await Customer.find({});
    if (!customers || customers.length === 0) {
      return NextResponse.json(
        { error: "No customers found" },
        { status: 404 }
      );
    }

    // Prepare the response with car, car details, and customers
    const responseData = {
      message: "Car and customers details retrieved successfully",
      car: car,
      carDetails: carDetails,
      customers: customers,
    };

    console.log("Retrieved car and customers details successfully:", responseData);

    // Send success response
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error retrieving car and customers details:", error);
    // Send error response
    return NextResponse.json(
      { error: `Could not retrieve car and customers details: ${error.message}` },
      { status: 500 }
    );
  }
}


// Update car by ID
export async function PUT(req, { params }) {
  const updateData = await req.json();
  const { id } = params;
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not update car: " + error.message },
      { status: 500 }
    );
  }
}

// Delete car by ID
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    // Also delete the corresponding car details
    await CarDetails.deleteOne({ car: id });
    return NextResponse.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not delete car: " + error.message },
      { status: 500 }
    );
  }
}
