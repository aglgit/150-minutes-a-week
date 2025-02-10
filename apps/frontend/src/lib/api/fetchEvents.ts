import { ActivityType } from "../schema";

export const fetchEvents = () => {
    return Array.of(
        {
            id: "1",
            userId: "1",
            activity: ActivityType.Walking,
            date: "2025-02-09",
            startTime: "09:00",
            endTime: "10:00",
        },
        {
            id: "2",
            userId: "1",
            activity: ActivityType.Running,
            date: "2025-02-19",
            startTime: "18:00",
            endTime: "19:30",
        },
        {
            id: "3",
            userId: "1",
            activity: ActivityType.Biking,
            date: "2025-01-19",
            startTime: "18:00",
            endTime: "19:30",
        },
        {
            id: "4",
            userId: "1",
            activity: ActivityType.Swimming,
            date: "2025-03-19",
            startTime: "18:00",
            endTime: "19:30",
        }
    );
};
