import connectDB from "../../../lib/db";
import Installment from "../../../models/Installment";
import CarDetails from "../../../models/CarDetails";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const { installmentDate, amount, description, paid, car } = await req.json();
  try {
    // Fetch car details including selling price
    const carDetails = await CarDetails.findOne({ car: car._id });

    if (!carDetails) {
      return NextResponse.json(
        { error: "Car details not found" },
        { status: 404 }
      );
    }
    console.log("Car Details:", carDetails);
    // Debugging: Print car._id to ensure correct value
    console.log("Car ID:", car._id);

    // Fetch installments for the specified car
    const installments = await Installment.find({ car: car._id });

    // Calculate total installment amount for the car
    const totalAmount = installments.reduce(
      (total, installment) => total + installment.amount,
      0
    );

    console.log("Total Installments:", totalAmount);

    
    // Ensure that the sum of installments does not exceed the selling price
    if (totalAmount + amount > carDetails.value) {
      return NextResponse.json(
        { error: "Total installments exceed the selling price of the car" },
        { status: 400 }
      );
    }

    // Create a new installment instance
    const installment = new Installment({
      installmentDate,
      amount,
      description,
      paid,
      car: car._id,
    });

    // Save the transaction to the database
    await installment.save();

    // Return a success message
    return NextResponse.json({
      message: "Installment record created successfully",
      installment,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json(
      { error: "Could not create transaction record: " + error.message },
      { status: 500 }
    );
  }
}
