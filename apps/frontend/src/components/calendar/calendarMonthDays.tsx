"use client";

import React from "react";
import { Event } from "@/lib/schema/schema";
import { TODAY } from "@/lib/dates/dateUtils";

type Props = {
    events: Event[];
    currentDay: Date;
};

const CalendarMonthDays: React.FC<Props> = ({
    events,
    currentDay: currentDay,
}) => {
    const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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

    const days: Date[] = new Array(42).fill(null);
    for (let i = 0; i < totalDays; i++) {
        days[startDay + i - 1] = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            i + 1
        );
    }

    const getEventsForDay = (day: Date | null) => {
        if (!day) return [];
        const nextDay = new Date(day);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        return events.filter((event) => {
            const eventDate = new Date(event.startTime);
            return eventDate >= day && eventDate < nextDay;
        });
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <div className="grid grid-cols-7 gap-x-1">
            {days.map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const bgColor =
                    TODAY.toLocaleDateString() === day?.toLocaleDateString()
                        ? "bg-blue-600"
                        : "";

                return (
                    <div
                        key={index}
                        className={`${bgColor} flex h-20 flex-col items-center justify-center overflow-auto border-t`}
                        onClick={() => {
                            setSelectedDay(day);
                            setIsModalOpen(true);
                        }}
                    >
                        {day?.getDate() || ""}
                        {dayEvents.map((event) => (
                            <div
                                key={event.id}
                                className="mt-1 rounded border-blue-600 bg-blue-600 px-1 text-xs text-white"
                                onClick={() => {
                                    setSelectedDay(day);
                                    setIsModalOpen(true);
                                }}
                            >
                                {event.activity} (
                                {formatTime(new Date(event.startTime))}-
                                {formatTime(new Date(event.endTime))})
                            </div>
                        ))}
                    </div>
                );
            })}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative rounded-lg bg-neutral-800 p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold">
                            Selected day: {selectedDay?.toDateString()}
                        </h2>
                        <p className="mt-2">Click anywhere outside to close.</p>
                        <button
                            className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarMonthDays;
