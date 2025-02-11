"use client";

import { Event } from "@/lib/schema";

type Props = {
    events: Event[];
};

const WEEKLY_GOAL = 150;

const getMinutesBetween = (start: string, end: string) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    return endH * 60 + endM - (startH * 60 + startM);
};

const getCurrentWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return { start: monday, end: sunday };
};

const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset =
        startOfYear.getDay() <= 4
            ? startOfYear.getDay() - 1
            : startOfYear.getDay() - 7;

    const firstMonday = new Date(startOfYear);
    firstMonday.setDate(startOfYear.getDate() - daysOffset);

    const diffInDays = Math.floor(
        (date.getTime() - firstMonday.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((diffInDays + 1) / 7);
};

const WeeklyProgress: React.FC<Props> = ({ events }) => {
    const { start, end } = getCurrentWeekRange();
    const weekNumber = getWeekNumber(start);

    const thisWeekEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
    });

    const totalMinutes = thisWeekEvents.reduce(
        (sum: number, event: Event) =>
            sum + getMinutesBetween(event.startTime, event.endTime),
        0
    );

    const progress = Math.min((totalMinutes / WEEKLY_GOAL) * 100, 100);

    return (
        <div className="mx-auto max-w-md rounded-lg bg-gray-900 p-6 text-white shadow-md">
            <h2 className="mb-2 text-lg font-semibold">
                Progress for Week {weekNumber}:{" "}
            </h2>

            <div className="h-6 w-full rounded-lg bg-gray-700">
                <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <p className="text-center">
                {Math.round((progress / 100) * WEEKLY_GOAL)} / {WEEKLY_GOAL}{" "}
                minutes
            </p>
        </div>
    );
};

export default WeeklyProgress;
