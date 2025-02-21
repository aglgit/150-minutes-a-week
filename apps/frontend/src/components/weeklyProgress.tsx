import {
    getWeekNumber,
    getMinutesBetween,
    getWeekRange,
    TODAY,
} from "@/lib/dates/dateUtils";
import { Event } from "@/lib/schema/schema";

type Props = {
    events: Event[];
};

const WEEKLY_GOAL_MINUTES = 150;

const WeeklyProgress: React.FC<Props> = ({ events }) => {
    const { start, end } = getWeekRange(TODAY);
    const weekNumber = getWeekNumber(start);

    const thisWeekEvents = events.filter((event) => {
        return event.startTime >= start && event.startTime <= end;
    });

    const thisWeekMinutes = thisWeekEvents.reduce(
        (sum: number, event: Event) =>
            sum + getMinutesBetween(event.startTime, event.endTime),
        0
    );

    const thisWeekProgressPercent = Math.min(
        (thisWeekMinutes / WEEKLY_GOAL_MINUTES) * 100,
        100
    );

    return (
        <div className="mx-auto max-w-md rounded-lg bg-gray-900 p-6 text-white shadow-md">
            <h2 className="mb-2 text-lg font-semibold">
                Progress for Week {weekNumber}:{" "}
            </h2>

            <div className="h-6 w-full rounded-lg bg-gray-700">
                <div
                    className="h-full bg-green-500 transition-all"
                    style={{ width: `${thisWeekProgressPercent}%` }}
                ></div>
            </div>

            <p className="text-center">
                {Math.round(
                    (thisWeekProgressPercent / 100) * WEEKLY_GOAL_MINUTES
                )}{" "}
                / {WEEKLY_GOAL_MINUTES} minutes
            </p>
        </div>
    );
};

export default WeeklyProgress;
