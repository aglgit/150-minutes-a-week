import { ActivityType, Event } from "@/lib/schema";
import { NextResponse } from "next/server";

const today = new Date();

const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const mockEvents: Event[] = Array.of(
    {
        id: "1",
        userId: "1",
        activity: ActivityType.Walking,
        date: today.toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "10:00",
    },
    {
        id: "2",
        userId: "1",
        activity: ActivityType.Running,
        date: addDays(today, -12).toISOString().split("T")[0],
        startTime: "18:00",
        endTime: "19:30",
    },
    {
        id: "3",
        userId: "1",
        activity: ActivityType.Biking,
        date: addDays(today, -27).toISOString().split("T")[0],
        startTime: "18:00",
        endTime: "19:30",
    },
    {
        id: "4",
        userId: "1",
        activity: ActivityType.Swimming,
        date: addDays(today, +5).toISOString().split("T")[0],
        startTime: "10:00",
        endTime: "10:20",
    },
    {
        id: "5",
        userId: "1",
        activity: ActivityType.Walking,
        date: addDays(today, +5).toISOString().split("T")[0],
        startTime: "12:00",
        endTime: "12:30",
    },
    {
        id: "6",
        userId: "1",
        activity: ActivityType.Moderate,
        date: addDays(today, +16).toISOString().split("T")[0],
        startTime: "14:00",
        endTime: "14:30",
    },
    {
        id: "7",
        userId: "1",
        activity: ActivityType.Vigorous,
        date: addDays(today, +24).toISOString().split("T")[0],
        startTime: "18:00",
        endTime: "19:00",
    },
    {
        id: "8",
        userId: "1",
        activity: ActivityType.Rowing,
        date: addDays(today, +9).toISOString().split("T")[0],
        startTime: "07:00",
        endTime: "07:15",
    }
);

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
