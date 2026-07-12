import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        return NextResponse.json(
            { message: "Admin password is not configured" },
            { status: 500 }
        );
    }

    if (password !== adminPassword) {
        return NextResponse.json(
            { message: "Invalid password" },
            { status: 401 }
        );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("tabit_admin", "true", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 3,
    });

    return response;
}
