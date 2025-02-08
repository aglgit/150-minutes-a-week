import styles from "./header.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.header}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </div>
    );
}
