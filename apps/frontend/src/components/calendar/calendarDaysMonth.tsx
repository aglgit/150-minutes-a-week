"use client";

import React from "react";
import { Event } from "@/lib/schema";

type Props = {
    events: Event[];
    currentDay: Date;
};

const CalendarDaysMonth: React.FC<Props> = ({
    events,
    currentDay: currentDay,
}) => {
    const today = new Date();

    const firstDayOfMonth = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        1
    );
    const lastDayOfMonth = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth() + 1,
        0
    );

    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const days: number[] = new Array(42).fill(null);
    for (let i = 0; i < totalDays; i++) {
        days[startDay + i - 1] = i + 1;
    }

    const getEventsForDay = (day: number | null) => {
        if (!day) return [];
        const dateStr = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
        return events.filter((event) => event.date === dateStr);
    };

    return (
        <div className="grid grid-cols-7 gap-x-1">
            {days.map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const bgColor =
                    today.getFullYear() === currentDay.getFullYear() &&
                    today.getMonth() === currentDay.getMonth() &&
                    today.getDate() === day
                        ? "bg-blue-600"
                        : "";

                return (
                    <div
                        key={index}
                        className={`${bgColor} flex h-20 flex-col items-center justify-center overflow-auto border-t`}
                    >
                        {day || ""}
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className="mt-1 rounded border-gray-500 bg-gray-500 px-1 text-xs text-white"
                            >
                                {event.activity} ({event.startTime}-
                                {event.endTime})
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default CalendarDaysMonth;
