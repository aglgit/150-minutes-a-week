"use client";

import Calendar from "@/components/calendar/calendar";
import WeeklyProgress from "@/components/weeklyProgress";
import { Event } from "@/lib/schema/schema";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, [refresh]);

    const fetchEvents = async () => {
        const response = await fetch("/api/proxy");
        if (!response.ok) {
            return;
        }
        const result: Event[] = await response.json();
        setEvents(result);
    };

    const refreshEvents = () => {
        setRefresh((prev) => !prev);
    };

    return (
        <>
            <Calendar events={events} refreshEvents={refreshEvents} />
            <WeeklyProgress events={events} />
        </>
    );
};

export default Home;
