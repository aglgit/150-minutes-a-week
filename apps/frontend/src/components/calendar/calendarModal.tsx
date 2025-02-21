import { ActivityType, CreateEvent } from "@/lib/schema/schema";
import React, { useState } from "react";

type CalendarModalProps = {
    selectedDay: Date | null;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refreshEvents: () => void;
};

const CalendarModal: React.FC<CalendarModalProps> = ({
    selectedDay,
    setIsModalOpen,
    refreshEvents,
}) => {
    const [activity, setActivity] = useState(ActivityType.Moderate);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("09:30");

    async function createEvent(event: CreateEvent) {
        const response = await fetch("/api/proxy", {
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
            .then(() => setIsModalOpen(false))
            .then(refreshEvents)
            .catch((error) => console.error("Error creating event", error));
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
        >
            <div
                className="relative rounded-lg bg-neutral-800 p-6 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold">
                    Create new event: {selectedDay?.toDateString()}
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
                        <option value="Cycling">Cycling</option>
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
                    onClick={() => setIsModalOpen(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CalendarModal;
