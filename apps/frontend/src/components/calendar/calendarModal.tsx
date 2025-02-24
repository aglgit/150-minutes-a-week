import { Event } from "@/lib/schema/schema";
import React from "react";
import CreateEventForm from "./createEventForm";
import EditEventForm from "./editEventForm";

type CalendarModalProps = {
    selectedDay: Date | null;
    selectedEvent: Event | null;
    modalType: "create" | "edit" | null;
    setModalType: React.Dispatch<
        React.SetStateAction<"create" | "edit" | null>
    >;
    refreshEvents: () => void;
};

const CalendarModal: React.FC<CalendarModalProps> = ({
    selectedDay,
    selectedEvent,
    modalType,
    setModalType,
    refreshEvents,
}) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => {
                setModalType(null);
            }}
        >
            <div
                className="relative rounded-lg bg-neutral-800 p-6 shadow-lg"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {modalType === "create" && (
                    <CreateEventForm
                        selectedDay={selectedDay}
                        setModalType={setModalType}
                        refreshEvents={refreshEvents}
                    />
                )}
                {modalType === "edit" && (
                    <EditEventForm
                        selectedEvent={selectedEvent}
                        setModalType={setModalType}
                        refreshEvents={refreshEvents}
                    />
                )}
            </div>
        </div>
    );
};

export default CalendarModal;
