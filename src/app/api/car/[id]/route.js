import connectDB from "../../../../lib/db";
import Car from "../../../../models/Cars";
import CarDetails from "../../../../models/CarDetails";
import { NextResponse } from "next/server";


// Get car by ID
export async function GET(req, { params }) {
  // Connect to the database
await connectDB();
  const { id } = params;
  try {
    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }
    return NextResponse.json(car);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not retrieve car: " + error.message },
      { status: 500 }
    );
  }
}

// Update car by ID
export async function PUT(req, res) {
  const { id } = req.params;
  const updateData = req.body;
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
export async function DELETE(req, res) {
  const { id } = req.params;
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
