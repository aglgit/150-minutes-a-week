export enum WeekDay {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}

export enum Month {
    January = "January",
    February = "February",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December",
}

export type DayName = {
    full: WeekDay;
    short: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
};

export type MonthName = {
    full: Month;
    short:
        | "Jan"
        | "Feb"
        | "Mar"
        | "Apr"
        | "May"
        | "Jun"
        | "Jul"
        | "Aug"
        | "Sep"
        | "Oct"
        | "Nov"
        | "Dec";
};

export type WeekRange = {
    start: Date;
    end: Date;
};

export const WEEK_DAY_NAMES: DayName[] = [
    { full: WeekDay.Monday, short: "Mon" },
    { full: WeekDay.Tuesday, short: "Tue" },
    { full: WeekDay.Wednesday, short: "Wed" },
    { full: WeekDay.Thursday, short: "Thu" },
    { full: WeekDay.Friday, short: "Fri" },
    { full: WeekDay.Saturday, short: "Sat" },
    { full: WeekDay.Sunday, short: "Sun" },
];

export const MONTH_NAMES: MonthName[] = [
    { full: Month.January, short: "Jan" },
    { full: Month.February, short: "Feb" },
    { full: Month.March, short: "Mar" },
    { full: Month.April, short: "Apr" },
    { full: Month.May, short: "May" },
    { full: Month.June, short: "Jun" },
    { full: Month.July, short: "Jul" },
    { full: Month.August, short: "Aug" },
    { full: Month.September, short: "Sep" },
    { full: Month.October, short: "Oct" },
    { full: Month.November, short: "Nov" },
    { full: Month.December, short: "Dec" },
];

export const TODAY = new Date();

export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const addDaysSetTime = (
    date: Date,
    days: number,
    hours: number,
    minutes: number
): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
};

export const getMinutesBetween = (start: Date, end: Date): number => {
    return Math.abs(end.getTime() - start.getTime()) / (1000 * 60);
};

export const getWeekRange = (date: Date): WeekRange => {
    const dayOfWeek = date.getDay();

    const monday = new Date(TODAY);
    monday.setDate(TODAY.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { start: monday, end: sunday };
};

export const getWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const daysOffset =
        startOfYear.getDay() <= 4
            ? startOfYear.getDay() - 1
            : startOfYear.getDay() - 7;

    const firstMonday = new Date(startOfYear);
    firstMonday.setDate(startOfYear.getDate() - daysOffset);

    const diffInDays = Math.floor(
        (date.getTime() - firstMonday.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((diffInDays + 1) / 7);
};
