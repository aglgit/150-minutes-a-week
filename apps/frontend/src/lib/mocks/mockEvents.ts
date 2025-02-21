import { Event, ActivityType } from "@/lib/schema/schema";
import { addDaysSetTime, TODAY } from "../dates/dateUtils";

export const mockEvents: Event[] = Array.of(
    {
        id: "1",
        userId: "1",
        activity: ActivityType.Walking,
        startTime: addDaysSetTime(TODAY, 0, 9, 0),
        endTime: addDaysSetTime(TODAY, 0, 10, 0),
    },
    {
        id: "2",
        userId: "1",
        activity: ActivityType.Running,
        startTime: addDaysSetTime(TODAY, -12, 18, 0),
        endTime: addDaysSetTime(TODAY, -12, 19, 30),
    },
    {
        id: "3",
        userId: "1",
        activity: ActivityType.Biking,
        startTime: addDaysSetTime(TODAY, -27, 18, 0),
        endTime: addDaysSetTime(TODAY, -27, 19, 30),
    },
    {
        id: "4",
        userId: "2",
        activity: ActivityType.Swimming,
        startTime: addDaysSetTime(TODAY, 5, 10, 0),
        endTime: addDaysSetTime(TODAY, 5, 10, 20),
    },
    {
        id: "5",
        userId: "1",
        activity: ActivityType.Walking,
        startTime: addDaysSetTime(TODAY, 5, 12, 0),
        endTime: addDaysSetTime(TODAY, 5, 12, 30),
    },
    {
        id: "6",
        userId: "1",
        activity: ActivityType.Moderate,
        startTime: addDaysSetTime(TODAY, 16, 14, 0),
        endTime: addDaysSetTime(TODAY, 16, 14, 30),
    },
    {
        id: "7",
        userId: "2",
        activity: ActivityType.Vigorous,
        startTime: addDaysSetTime(TODAY, 24, 18, 0),
        endTime: addDaysSetTime(TODAY, 24, 19, 0),
    },
    {
        id: "8",
        userId: "1",
        activity: ActivityType.Rowing,
        startTime: addDaysSetTime(TODAY, 9, 7, 0),
        endTime: addDaysSetTime(TODAY, 9, 7, 15),
    }
);
