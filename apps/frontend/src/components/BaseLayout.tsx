import Footer from "./navigation/footer";
import Header from "./navigation/header";

interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    return (
        <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr_auto] items-center justify-center gap-2">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default BaseLayout;
