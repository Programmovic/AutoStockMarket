import connectDB from "../../../lib/db";
import Car from "../../../models/Cars";
import CarDetails from "../../../models/CarDetails";
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
  } = await req.json();

  try {
    // Check if a car with the given chassisNumber already exists
    const carExists = await Car.findOne({ chassisNumber });

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

    // Convert to integers
    page = parseInt(page);
    perPage = parseInt(perPage);

    // Define the filter object
    const filter = {};
    if (name) filter.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    if (color) filter.color = { $regex: new RegExp(color, "i") };
    if (model) filter.model = { $regex: new RegExp(model, "i") };

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
