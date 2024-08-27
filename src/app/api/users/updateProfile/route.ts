import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        // Get data from req.body
        const reqBody = await request.json();
        const { userId, newUserData } = reqBody;
        const { username, profilePicUrl, thumbnailColor, bio, location } = newUserData;

        console.log("Request Body is", userId, newUserData);

        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update user details
        user.username = username || user.username;
        user.profilePicUrl = profilePicUrl || user.profilePicUrl;
        user.thumbnailColor = thumbnailColor || user.thumbnailColor; // Assuming you have this field
        user.bio = bio || user.bio;
        user.location = location || user.location;

        // Save updated user to MongoDB
        const updatedUser = await user.save();
        console.log("Updated user is", updatedUser);

        return NextResponse.json({
            message: "User profile updated successfully",
            success: true,
            updatedUser
        }, { status: 200 });

    } catch (error: any) {
        console.log("Update profile controller failed", error.message);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
