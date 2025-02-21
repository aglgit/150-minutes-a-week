import React from "react";
import { Event } from "@/lib/schema/schema";

type CalendarMonthDayEventProps = {
    event: Event;
};

const CalendarMonthDayEvent: React.FC<CalendarMonthDayEventProps> = ({
    event,
}) => {
    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return (
        <div className="mt-1 rounded border-blue-600 bg-blue-600 px-1 text-xs text-white">
            {event.activity} ({formatTime(new Date(event.startTime))}-
            {formatTime(new Date(event.endTime))})
        </div>
    );
};

export default CalendarMonthDayEvent;
