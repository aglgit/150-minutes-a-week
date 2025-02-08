import Footer from "./navigation/footer";
import Header from "./navigation/header";
import styles from "./baseLayout.module.css";

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div id={styles.app}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
