export enum DayOfWeek {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}

export type DayInfo = {
    full: DayOfWeek;
    short: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
};

export const DAYS: DayInfo[] = [
    { full: DayOfWeek.Monday, short: "Mon" },
    { full: DayOfWeek.Tuesday, short: "Tue" },
    { full: DayOfWeek.Wednesday, short: "Wed" },
    { full: DayOfWeek.Thursday, short: "Thu" },
    { full: DayOfWeek.Friday, short: "Fri" },
    { full: DayOfWeek.Saturday, short: "Sat" },
    { full: DayOfWeek.Sunday, short: "Sun" },
];

export const getShortName = (day: DayOfWeek): string => {
    return DAYS.find((d) => d.full === day)?.short || "";
};
