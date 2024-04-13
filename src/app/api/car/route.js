import connectDB from "../../../lib/db";
import Car from "../../../models/Cars";
import CarDetails from "../../../models/CarDetails";
import { NextResponse } from "next/server";

// Connect to the database
connectDB();

// Create a new car and its details
export async function POST(req, res) {
  const { name, color, model, chassisNumber, owner, purchaseDetails, maintenance, currentLocation } = await req.json();

  try {
    // Check if a car with the given chassisNumber already exists
    const carExists = await Car.findOne({ chassisNumber });

    if (carExists) {
      return NextResponse.json({ error: "Car already exists" }, { status: 400 });
    }

    // Create a new car instance
    const car = new Car({
      name,
      color,
      model,
      chassisNumber,
      owner,
      purchaseDetails,
      maintenance,
      currentLocation,
    });

    // Save the car to the database
    await car.save();

    // Create a corresponding car details entry
    const carDetails = new CarDetails({
      car: car._id, // Reference to the newly created car
      value: 0, // Set default values for other fields
      sellingPrice: 0,
      capital: 0,
      maintenanceCosts: 0,
      netProfit: 0,
    });

    // Save the car details to the database
    await carDetails.save();

    // Return a success message
    return NextResponse.json({ message: "Car created successfully", car });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json({ error: "Could not create car: " + error.message }, { status: 500 });
  }
}

// Get all cars
export async function GET(req, res) {
  try {
    const cars = await Car.find();
    return NextResponse.json(cars);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not retrieve cars: " + error.message }, { status: 500 });
  }
}


