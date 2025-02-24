import { ActivityType, Event } from "@/lib/schema/schema";
import React, { useState } from "react";

type CalendarModalProps = {
    selectedEvent: Event | null;
    setModalType: React.Dispatch<
        React.SetStateAction<"create" | "edit" | null>
    >;
    refreshEvents: () => void;
};

const EditEventForm: React.FC<CalendarModalProps> = ({
    selectedEvent,
    setModalType,
    refreshEvents,
}) => {
    const [activity, setActivity] = useState(ActivityType.Walking);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("09:30");

    async function updateEvent(event: Event) {
        const response = await fetch(`/api/events/${event.id}`, {
            method: "PUT",
            body: JSON.stringify(event),
        });
        if (!response.ok) {
            return;
        }
    }

    async function deleteEvent(event: Event) {
        const response = await fetch(`/api/events/${event.id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            return;
        }
    }

    const convertTimeToDateTime = (day: Date, time: string): Date => {
        const [hours, minutes] = time.split(":").map(Number);
        const newDate = new Date(day);
        newDate.setHours(hours, minutes, 0, 0);
        return newDate;
    };

    const handleSubmit = () => {
        const updatedEvent: Event = {
            id: selectedEvent!.id,
            userId: selectedEvent!.userId,
            activity,
            startTime: convertTimeToDateTime(
                selectedEvent!.startTime,
                startTime
            ),
            endTime: convertTimeToDateTime(selectedEvent!.endTime, endTime),
        };
        updateEvent(updatedEvent)
            .then(() => setModalType(null))
            .then(refreshEvents)
            .catch((error) => console.error("Error editing event", error));
    };

    const handleDelete = () => {
        const deletedEvent = selectedEvent!;
        deleteEvent(deletedEvent)
            .then(() => setModalType(null))
            .then(refreshEvents)
            .catch((error) => console.error("Error deleting event", error));
    };

    return (
        <div className="relative rounded-lg bg-neutral-800 p-6 shadow-lg">
            <h2 className="text-lg font-bold">
                Edit event for: {selectedEvent?.activity}, id:{" "}
                {selectedEvent?.id}
            </h2>
            <div>
                <label className="block">Activity:</label>
                <select
                    value={activity}
                    onChange={(e) =>
                        setActivity(
                            ActivityType[
                                e.target.value as keyof typeof ActivityType
                            ]
                        )
                    }
                    className="w-full rounded border p-2 text-black"
                >
                    <option value="Walking">Walking</option>
                    <option value="Running">Running</option>
                    <option value="Biking">Cycling</option>
                    <option value="Swimming">Swimming</option>
                </select>
                <div className="mt-2">
                    <label className="block">Start Time:</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full rounded border p-2 text-black"
                    />
                </div>
                <div className="mt-2">
                    <label className="block">End Time:</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full rounded border p-2 text-black"
                    />
                </div>
                <button
                    className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
                    onClick={handleSubmit}
                >
                    Save Event
                </button>
                <button
                    className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
                    onClick={handleDelete}
                >
                    Delete Event
                </button>
            </div>
            <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => setModalType(null)}
            >
                Close
            </button>
        </div>
    );
};

export default EditEventForm;
