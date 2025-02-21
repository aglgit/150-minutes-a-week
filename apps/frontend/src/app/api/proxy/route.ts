import { NextResponse } from "next/server";
import { mockEvents } from "../../../lib/mocks/mockEvents";

export async function GET() {
    const backendUrl = process.env.BACKEND_URL;
    const username = process.env.BACKEND_USERNAME;
    const password = process.env.BACKEND_PASSWORD;

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(mockEvents, { status: 200 });
    }

    if (!backendUrl || !username || !password) {
        return NextResponse.json(
            { error: "Missing required credentials" },
            { status: 500 }
        );
    }

    try {
        const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
        const response = await fetch(`${backendUrl}/events`, {
            method: "GET",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json(
                { error: "An unknown error occurred" },
                { status: 500 }
            );
        }
    }
}
