"use client";

import React from "react";

interface CalendarHeaderProps {
    currentMonth: Date;
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarNav: React.FC<CalendarHeaderProps> = ({
    currentMonth,
    setCurrentMonth,
}) => {
    const addMonth = (val: number) => {
        setCurrentMonth(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + val, 1)
        );
    };

    const formatMonthYear = (date: Date) => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={() => addMonth(-1)}
                    className="red rounded bg-blue-400 p-2 text-white"
                >
                    ← Prev
                </button>
                <h2 className="text-xl font-semibold">
                    {formatMonthYear(currentMonth)}
                </h2>
                <button
                    onClick={() => addMonth(+1)}
                    className="rounded bg-blue-400 p-2 text-white"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default CalendarNav;
