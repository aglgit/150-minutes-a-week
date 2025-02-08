import Footer from "./navigation/footer";
import Header from "./navigation/header";

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
}
