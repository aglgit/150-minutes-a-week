import { NextResponse } from "next/server";
import { mockEvents } from "../../../lib/mocks/mockEvents";
import { Event } from "@/lib/schema/schema";
import { cookies } from "next/headers";

const backendUrl = process.env.BACKEND_URL;

export async function GET(): Promise<NextResponse> {
    const cookieStore = await cookies();

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(mockEvents, { status: 200 });
    }

    try {
        const response = await fetch(`${backendUrl}/events`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json().then((events: Event[]) => {
            return events.map((event): Event => {
                return {
                    ...event,
                    startTime: new Date(event.startTime),
                    endTime: new Date(event.endTime),
                };
            });
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

export async function POST(request: Request): Promise<NextResponse> {
    const body = await request.json();
    const bodyString = JSON.stringify(body);
    const cookieStore = await cookies();

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(bodyString, { status: 200 });
    }

    try {
        const response = await fetch(`${backendUrl}/events`, {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString(),
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
                startTime: event.startTime,
                endTime: event.endTime,
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
