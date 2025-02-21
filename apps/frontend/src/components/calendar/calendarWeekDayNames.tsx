import React from "react";
import { WEEK_DAY_NAMES } from "@/lib/dates/dateUtils";

const CalendarDayNames: React.FC = ({}) => {
    return (
        <div className="grid grid-cols-7 place-items-center gap-6 bg-[#1c1c1e] sm:gap-12">
            {WEEK_DAY_NAMES.map((day) => (
                <div key={day.full} className="text-center font-bold">
                    {day.short}
                </div>
            ))}
        </div>
    );
};

export default CalendarDayNames;
