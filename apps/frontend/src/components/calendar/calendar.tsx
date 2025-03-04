import React, { useState } from "react";
import { Event } from "@/lib/schema/schema";
import CalendarNav from "./calendarNav";
import CalendarDayNames from "./calendarWeekDayNames";
import CalendarMonthDays from "./calendarMonthDays";
import { TODAY } from "@/lib/dates/dateUtils";

type Props = {
    events: Event[];
    refreshEvents: () => void;
};

const Calendar: React.FC<Props> = ({ events, refreshEvents }) => {
    const [currentDay, setCurrentDay] = useState(TODAY);

    return (
        <div className="grid h-4/6 w-full grid-cols-1 grid-rows-[auto_auto_1fr]">
            <CalendarNav
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
            />
            <CalendarDayNames />
            <CalendarMonthDays
                events={events}
                currentDay={currentDay}
                refreshEvents={refreshEvents}
            />
        </div>
    );
};

export default Calendar;
