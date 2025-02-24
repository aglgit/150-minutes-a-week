import React, { useState } from "react";
import { Event } from "@/lib/schema/schema";
import { TODAY } from "@/lib/dates/dateUtils";
import CalendarMonthDayEvent from "./calendarMonthDayEvent";
import CalendarModal from "./calendarModal";

type Props = {
    events: Event[];
    currentDay: Date;
    refreshEvents: () => void;
};

const CalendarMonthDays: React.FC<Props> = ({
    events,
    currentDay,
    refreshEvents,
}) => {
    const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
    const [selectedDay, setSelectedDay] = React.useState<Date | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const firstDayOfMonth = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        1
    );
    const daysToShow = 6 * 7;
    const days: Date[] = new Array(daysToShow).fill(null);
    for (let i = 0; i < daysToShow; i++) {
        const day = new Date(firstDayOfMonth);
        day.setDate(day.getDate() + i + 1 - firstDayOfMonth.getDay());
        days[i] = day;
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
                            setModalType("create");
                        }}
                    >
                        {day?.getDate() || ""}
                        {dayEvents.map((event, index) => (
                            <CalendarMonthDayEvent
                                key={index}
                                event={event}
                                setModalType={setModalType}
                                setSelectedEvent={setSelectedEvent}
                            />
                        ))}
                    </div>
                );
            })}
            {modalType && (
                <CalendarModal
                    selectedDay={selectedDay}
                    selectedEvent={selectedEvent}
                    modalType={modalType}
                    setModalType={setModalType}
                    refreshEvents={refreshEvents}
                />
            )}
        </div>
    );
};

export default CalendarMonthDays;
