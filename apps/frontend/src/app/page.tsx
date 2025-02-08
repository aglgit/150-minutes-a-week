import BaseLayout from "@/components/BaseLayout";
import Calendar from "@/components/calendar";

export default function Home() {
    return (
        <BaseLayout>
            <div>
                <Calendar></Calendar>
            </div>
        </BaseLayout>
    );
}
