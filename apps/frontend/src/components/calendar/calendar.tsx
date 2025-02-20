"use client";

import React, { useState } from "react";
import { Event } from "@/lib/schema";
import CalendarNav from "../calendarNav";
import CalendarDayNames from "./calendarDayNames";
import CalendarDaysMonth from "./calendarDaysMonth";

type Props = {
    events: Event[];
};

const Calendar: React.FC<Props> = ({ events }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    return (
        <div className="grid h-4/6 w-full grid-cols-1 grid-rows-[auto_auto_1fr]">
            <CalendarNav
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
            />
            <CalendarDayNames />
            <CalendarDaysMonth events={events} currentMonth={currentMonth} />
        </div>
    );
};

export default Calendar;
