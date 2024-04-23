import connectDB from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    // Connect to the database
    await connectDB();

    // Extract user ID from the request parameters
    const { id } = params;

    try {
        // Find the admin by ID
        const admin = await Admin.findById(id);

        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Return the user information
        return NextResponse.json({ admin });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch user information: " + error.message }, { status: 500 });
    }
}
