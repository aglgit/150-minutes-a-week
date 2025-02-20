"use client";

import Calendar from "@/components/calendar";
import WeeklyProgress from "@/components/weeklyProgress";
import { Event } from "@/lib/schema";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/proxy");
            if (!response.ok) {
                setEvents([]);
                return;
            }
            const result = await response.json();
            setEvents(result);
        }

        fetchData();
    }, []);

    return (
        <>
            <Calendar events={events} />
            <WeeklyProgress events={events} />
        </>
    );
};

export default Home;
