import { ActivityType } from "../schema";

const today = new Date();

const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const fetchEvents = () => {
    return Array.of(
        {
            id: "1",
            userId: "1",
            activity: ActivityType.Walking,
            date: today.toISOString().split("T")[0],
            startTime: "09:00",
            endTime: "10:00",
        },
        {
            id: "2",
            userId: "1",
            activity: ActivityType.Running,
            date: addDays(today, -12).toISOString().split("T")[0],
            startTime: "18:00",
            endTime: "19:30",
        },
        {
            id: "3",
            userId: "1",
            activity: ActivityType.Biking,
            date: addDays(today, -27).toISOString().split("T")[0],
            startTime: "18:00",
            endTime: "19:30",
        },
        {
            id: "4",
            userId: "1",
            activity: ActivityType.Swimming,
            date: addDays(today, +5).toISOString().split("T")[0],
            startTime: "10:00",
            endTime: "10:45",
        },
        {
            id: "5",
            userId: "1",
            activity: ActivityType.Moderate,
            date: addDays(today, +16).toISOString().split("T")[0],
            startTime: "14:00",
            endTime: "14:30",
        },
        {
            id: "6",
            userId: "1",
            activity: ActivityType.Vigorous,
            date: addDays(today, +24).toISOString().split("T")[0],
            startTime: "18:00",
            endTime: "19:00",
        }
    );
};
