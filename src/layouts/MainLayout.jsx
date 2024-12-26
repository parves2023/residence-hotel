import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { GiChemicalArrow } from "react-icons/gi";



// main layout page


const MainLayout = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet> 
            <Footer></Footer>
            <ScrollToTop smooth component={<GiChemicalArrow className="text-yellow-700 -rotate-[135deg]  z-50 text-3xl p-1" />} />
        </div>
    );
};

export default MainLayout;