import Footer from "./navigation/footer";
import Header from "./navigation/header";

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid- grid h-full grid-cols-1 grid-rows-[auto_1fr_auto] items-center justify-center gap-2">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
