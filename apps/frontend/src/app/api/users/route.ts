import { NextResponse } from "next/server";
import { UserInfo } from "@/lib/schema/schema";
import { cookies } from "next/headers";
import { mockUser } from "@/lib/mocks/mockUsers";

const backendUrl = process.env.BACKEND_URL;

export async function GET(): Promise<NextResponse> {
    const cookieStore = await cookies();

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(mockUser, { status: 200 });
    }

    try {
        const response = await fetch(`${backendUrl}/users`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString(),
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json().then((user: UserInfo) => {
            return {
                ...user,
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
