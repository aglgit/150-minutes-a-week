"use client";

import React, { useState } from "react";
import { DAYS } from "@/lib/days"; // Import days of the week
import { Event } from "@/lib/schema"; // Import event type
import CalendarNav from "./calendarNav";

type Props = {
    events: Event[];
};

const Calendar: React.FC<Props> = ({ events }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const lastDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    );

    const totalDays = lastDayOfMonth.getDate();

    const days = new Array(35).fill(null);
    for (let i = 0; i < totalDays; i++) {
        days[i] = i + 1;
    }

    const getEventsForDay = (day: number | null) => {
        if (!day) return [];
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
        return events.filter((event) => event.date === dateStr);
    };

    return (
        <div>
            <CalendarNav
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
            />

            <div className="grid grid-cols-7 gap-2 rounded-lg border border-gray-300 p-4">
                {DAYS.map((day) => (
                    <div key={day.full} className="text-center font-bold">
                        {day.short}
                    </div>
                ))}

                {days.map((day, index) => {
                    const dayEvents = getEventsForDay(day);

                    return (
                        <div
                            key={index}
                            className={`flex h-12 flex-col items-center justify-center border border-gray-700 ${
                                day ? "text-white" : "text-gray-600 opacity-50"
                            }`}
                        >
                            {day || ""}
                            {dayEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="mt-1 rounded bg-blue-500 px-1 text-xs text-white"
                                >
                                    {event.activity} ({event.startTime})
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
