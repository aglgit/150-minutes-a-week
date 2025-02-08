import styles from "./calendar.module.css";

export default function Calendar() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const daysArray = Array.from({ length: 42 }, (_, i) => i + 1);

    return (
        <div className={styles.calendarContainer}>
            {days.map((day) => (
                <div key={day} className={styles.header}>
                    {day}
                </div>
            ))}

            {daysArray.map((_, index) => (
                <div key={index} className={styles.day}>
                    {index + 1}
                </div>
            ))}
        </div>
    );
}
