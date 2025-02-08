import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <Link href="https://github.com/aglgit/150-minutes-a-week">
                Github
            </Link>
        </div>
    );
}
