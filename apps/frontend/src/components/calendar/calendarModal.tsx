"use client";

import React from "react";

type CalendarModalProps = {
    selectedDay: Date | null;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CalendarModal: React.FC<CalendarModalProps> = ({
    selectedDay,
    setIsModalOpen,
}) => {
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
                    Selected day: {selectedDay?.toDateString()}
                </h2>
                <p className="mt-2">Click anywhere outside to close.</p>
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
