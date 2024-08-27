import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

// Ensure the database connection
connect();

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { username } = reqBody;
        console.log("Username is ", username);

        // Check in the database
        const user = await User.findOne({ username });

        if (user) {
            console.log("User with this name already exists");
            return NextResponse.json({
                message: "Username already taken",
                success: true
            }, { status: 201 });
        }

        console.log("Username available");
        return NextResponse.json({
            message: "Username available",
            success: true
        }, { status: 200 });

    } catch (error) {
        console.error("Unable to fetch user", error);
        return NextResponse.json({
            message: "Unable to fetch user",
            success: false
        }, { status: 500 });
    }
}
