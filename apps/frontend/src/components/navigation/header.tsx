import Link from "next/link";

export default function Footer() {
    return (
        <header className="mx-auto flex items-center justify-center gap-1 p-2">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </header>
    );
}
