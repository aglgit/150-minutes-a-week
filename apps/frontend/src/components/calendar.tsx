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
        <div className="grid h-4/5 w-full grid-cols-1 grid-rows-[auto_auto_1fr]">
            <CalendarNav
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
            />

            <div className="grid grid-cols-7 place-items-center gap-6 bg-[#1c1c1e] sm:gap-12">
                {DAYS.map((day) => (
                    <div key={day.full} className="text-center font-bold">
                        {day.short}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-x-1">
                {days.map((day, index) => {
                    const dayEvents = getEventsForDay(day);

                    return (
                        <div
                            key={index}
                            className="flex h-20 flex-col items-center justify-center overflow-scroll border-t border-gray-500"
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
