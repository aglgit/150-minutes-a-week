import React from "react";
import { Event } from "@/lib/schema/schema";
import { formatDateToHourMinute } from "@/lib/dates/dateUtils";

type CalendarMonthDayEventProps = {
    event: Event;
    setModalType: React.Dispatch<
        React.SetStateAction<"create" | "edit" | null>
    >;
    setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
};

const CalendarMonthDayEvent: React.FC<CalendarMonthDayEventProps> = ({
    event,
    setModalType,
    setSelectedEvent,
}) => {
    return (
        <div
            className="mt-1 rounded border-blue-600 bg-blue-600 px-1 text-xs text-white"
            onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(event);
                setModalType("edit");
            }}
        >
            {event.activity} ({formatDateToHourMinute(event.startTime)}-
            {formatDateToHourMinute(event.endTime)})
        </div>
    );
};

export default CalendarMonthDayEvent;
