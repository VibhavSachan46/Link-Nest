import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest) {
    try {
        // Get data from req body
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(email, password);

        // Check if user exists or not
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: "User doesnot exist"
            }, { status: 404 })
        }
        console.log("user found");
        
        // check for password
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({
                error: "Invalid Password"
            }, { status: 400 })
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log("token created");
        

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })
        console.log("token created 2");

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
            token
        })
        console.log("REsposnse");
        

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        console.log("Login failed");

        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}