"use client";

import React from "react";
import { Event } from "@/lib/schema";

type Props = {
    events: Event[];
    currentMonth: Date;
};

const CalendarDaysMonth: React.FC<Props> = ({ events, currentMonth }) => {
    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    );
    const lastDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    );

    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const days = new Array(42).fill(null);
    for (let i = 0; i < totalDays; i++) {
        days[startDay + i - 1] = i + 1;
    }

    const getEventsForDay = (day: number | null) => {
        if (!day) return [];
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
        return events.filter((event) => event.date === dateStr);
    };

    return (
        <div className="grid grid-cols-7 gap-x-1">
            {days.map((day, index) => {
                const dayEvents = getEventsForDay(day);

                return (
                    <div
                        key={index}
                        className="flex h-20 flex-col items-center justify-center overflow-auto border-t border-gray-500"
                    >
                        {day || ""}
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className="mt-1 rounded bg-blue-500 px-1 text-xs text-white"
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
