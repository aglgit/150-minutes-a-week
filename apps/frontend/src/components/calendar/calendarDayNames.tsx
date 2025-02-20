"use client";

import React from "react";
import { DAYS } from "@/lib/days";

const CalendarDayNames: React.FC = ({}) => {
    return (
        <div className="grid grid-cols-7 place-items-center gap-6 bg-[#1c1c1e] sm:gap-12">
            {DAYS.map((day) => (
                <div key={day.full} className="text-center font-bold">
                    {day.short}
                </div>
            ))}
        </div>
    );
};

export default CalendarDayNames;
