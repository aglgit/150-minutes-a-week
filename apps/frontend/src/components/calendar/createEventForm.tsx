import { ActivityType, CreateEvent } from "@/lib/schema/schema";
import React, { useState } from "react";

type CalendarModalProps = {
    selectedDay: Date | null;
    setModalType: React.Dispatch<
        React.SetStateAction<"create" | "edit" | null>
    >;
    refreshEvents: () => void;
};

const CreateEventForm: React.FC<CalendarModalProps> = ({
    selectedDay,
    setModalType,
    refreshEvents,
}) => {
    const [activity, setActivity] = useState(ActivityType.Walking);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("09:30");

    async function createEvent(event: CreateEvent) {
        const response = await fetch("/api/events", {
            method: "POST",
            body: JSON.stringify(event),
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
        const newEvent: CreateEvent = {
            userId: "1",
            activity,
            startTime: convertTimeToDateTime(selectedDay!, startTime),
            endTime: convertTimeToDateTime(selectedDay!, endTime),
        };
        createEvent(newEvent)
            .then(() => setModalType(null))
            .then(refreshEvents)
            .catch((error) => console.error("Error creating event", error));
    };

    return (
        <div className="relative rounded-lg bg-neutral-800 p-6 shadow-lg">
            <h2 className="text-lg font-bold">
                Create event for: {selectedDay?.toDateString()}
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
                    {Object.values(ActivityType).map((activity) => (
                        <option key={activity} value={activity}>
                            {activity}
                        </option>
                    ))}
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

export default CreateEventForm;
