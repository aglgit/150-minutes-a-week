import Calendar from "@/components/calendar";
import WeeklyProgress from "@/components/weeklyProgress";
import { fetchEvents } from "@/lib/api/fetchEvents";

export default function Home() {
    const events = fetchEvents();
    return (
        <>
            <Calendar events={events} />
            <WeeklyProgress events={events} />
        </>
    );
}
