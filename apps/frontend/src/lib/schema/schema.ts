export enum ActivityType {
    Walking = "Walking",
    Running = "Running",
    Biking = "Biking",
    Swimming = "Swimming",
    Strength = "Strength",
    Rowing = "Rowing",
    Ski = "Ski",
    Moderate = "Moderate",
    Vigorous = "Vigorous",
}

export type Event = {
    id: string;
    userId: string;
    activity: ActivityType;
    startTime: Date;
    endTime: Date;
};

export type User = {
    id: string;
};
