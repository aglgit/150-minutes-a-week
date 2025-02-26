import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <header className="mx-auto flex items-center justify-center gap-1 p-2">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/user">User</Link>
        </header>
    );
};

export default Footer;
