import Calendar from "@/components/calendar";
import { fetchEvents } from "@/lib/api/fetchEvents";

export default function Home() {
    const events = fetchEvents();
    return <Calendar events={events} />;
}
