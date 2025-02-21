import { MONTH_NAMES, TODAY } from "@/lib/dates/dateUtils";
import React from "react";

interface CalendarHeaderProps {
    currentDay: Date;
    setCurrentDay: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarNav: React.FC<CalendarHeaderProps> = ({
    currentDay: currentDay,
    setCurrentDay: setCurrentDay,
}) => {
    const addMonth = (val: number) => {
        setCurrentDay(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + val, 1)
        );
    };

    const formatYearMonth = (date: Date) => {
        const monthNames = MONTH_NAMES.map((m) => m.full);
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => addMonth(-1)}
                        className="red rounded bg-blue-400 p-2 text-white"
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={() => setCurrentDay(TODAY)}
                        className="red rounded bg-blue-400 p-2 text-white"
                    >
                        Today
                    </button>
                </div>

                <h2 className="text-xl font-semibold">
                    {formatYearMonth(currentDay)}
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
