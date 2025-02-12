"use client";

import Calendar from "@/components/calendar";
import WeeklyProgress from "@/components/weeklyProgress";
import { fetchEvents } from "@/lib/api/fetchEvents";
import { Event } from "@/lib/schema";
import { useEffect, useState } from "react";

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetchEvents().then((events) => setEvents(events));
    }, []);

    return (
        <>
            <Calendar events={events} />
            <WeeklyProgress events={events} />
        </>
    );
}
