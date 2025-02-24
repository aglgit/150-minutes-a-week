import { NextResponse } from "next/server";
import { Event } from "@/lib/schema/schema";

const backendUrl = process.env.BACKEND_URL;
const username = process.env.BACKEND_USERNAME;
const password = process.env.BACKEND_PASSWORD;

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const { id } = await context.params;
    const body = await request.json();
    const bodyString = JSON.stringify(body);

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(bodyString, { status: 200 });
    }

    if (!backendUrl || !username || !password) {
        return NextResponse.json(
            { error: "Missing required credentials" },
            { status: 500 }
        );
    }

    try {
        const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
        const response = await fetch(`${backendUrl}/events/${id}`, {
            method: "PUT",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            body: bodyString,
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json().then((event: Event) => {
            return {
                ...event,
                startTime: new Date(event.startTime),
                endTime: new Date(event.endTime),
            };
        });
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

export async function DELETE(
    _request: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    const { id } = await context.params;

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ status: 200 });
    }

    if (!backendUrl || !username || !password) {
        return NextResponse.json(
            { error: "Missing required credentials" },
            { status: 500 }
        );
    }

    try {
        const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
        const response = await fetch(`${backendUrl}/events/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return NextResponse.json({ status: 200 });
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
