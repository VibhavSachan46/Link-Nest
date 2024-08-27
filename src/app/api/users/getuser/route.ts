import { getDataFromToken } from "@/helper/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        console.log("REquest is ", request);

        const id = await getDataFromToken(request)

        const user = await User.findOne({ _id: id }).select("-password")

        console.log("User is", user);

        return NextResponse.json(
            {
                message: "User found",
                data: user
            })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}