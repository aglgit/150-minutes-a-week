import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mx-auto flex items-center justify-center gap-1 p-2">
            <Link href="https://github.com/aglgit/150-minutes-a-week">
                Github
            </Link>
        </footer>
    );
}
