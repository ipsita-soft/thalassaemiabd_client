import { Outlet, useOutlet } from "react-router-dom";
import BlogNews from "@/client/page/BlogNews";
import DonorPool from "@/client/page/DonorPool";
import FinancialDonation from "@/client/page/FinancialDonation";
import Footer from "@/client/page/Footer";
import Header from "@/client/page/HeaderSection";
import HeroArea from "@/client/page/HeroArea";
import LatestEvent from "@/client/page/LatestEvent";
import LatestNews from "@/client/page/LatestNews";
import PatientManagement from "@/client/page/PatientManagement";
import WishersSection from "@/client/page/WishersSection";

function ClientLayout() {
    const outlet = useOutlet();

    return (
        <div>
            <Header />
            {outlet ? (
                <Outlet />
            ) : (
                <>

                    <HeroArea />
                    <LatestNews />
                    <PatientManagement />
                    <DonorPool />
                    <FinancialDonation />
                    <LatestEvent />
                    <BlogNews />
                    <WishersSection />

                </>
            )}

            <Footer />
        </div>
    );
}

export default ClientLayout;
