import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        // Get data from req.body
        const reqBody = await request.json()
        const { username, fullName, email, password } = reqBody

        console.log("request Body is", username, fullName, email, password)

        //Check if user already exist or not
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            fullName,
            password: hashedPassword
        })

        // Save user to mongodb

        const savedUser = await newUser.save()
        console.log("Saved user is", savedUser);

        return NextResponse.json({
            message: "USer registerd successfully",
            success: true,
            savedUser
        }, { status: 200 })

    } catch (error: any) {
        console.log("Signup controller failed", error.message)

        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}