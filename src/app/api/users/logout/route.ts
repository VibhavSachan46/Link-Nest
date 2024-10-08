import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successs",
                success: true
            }
        )

        response.cookies.set("token", "",
            {
                httpOnly: true,
                expires: new Date(0)
            }
        )
        return response

    } catch (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 400 })
    }

}