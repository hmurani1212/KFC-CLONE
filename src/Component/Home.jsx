import React, { useRef, useState } from "react";
import Everyday from "./Everyday";  // Make sure to import your components
import ALA from "./ALA";
import PROMOTION from "./PROMOTION";
import SIGNATURE from "./SIGNATURE";
import SHARING from "./SHARING";
import Footer from "./Footer";
import KommunicateChat from "../chatBoat/KommunicateChat";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
const Home = () => {
    const [nav, setnav] = useState(false)
    const everydayRef = useRef(null);
    const alaRef = useRef(null);
    const promotionRef = useRef(null);
    const signatureRef = useRef(null);
    const sharingRef = useRef(null);

    const scrollToComponent = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };
    const HandleNav = () => {
        setnav(!nav)
    }
    // Snacks-&-Beverages     Midnight (Start at 12 am)
    return (
        <div className="md:ml-10 md:block">
            <div className="mr-8 relative top-32 md:top-28 w-full mb-10" >
               <p className="underline ml-6" onClick={HandleNav}>View More</p>
            </div>
            <div>

                {nav && <nav className="relative top-28 font-bold md:hidden block text-center w-full bg-orange-700" >
                    <p><li onClick={() => scrollToComponent(everydayRef)} className="cursor-pointer"> EVERYDAY VALUE</li></p>
                    <p > <li onClick={() => scrollToComponent(alaRef)} className="cursor-pointer"> ALA-CARTE-&-COMBOS</li></p>
                    <p > <li onClick={() => scrollToComponent(promotionRef)} className="cursor-pointer">PROMOTION</li></p>
                    <p> <li onClick={() => scrollToComponent(signatureRef)} className="cursor-pointer">SIGNATURE-BOXES</li></p>
                    <p> <li onClick={() => scrollToComponent(sharingRef)} className="cursor-pointer">Snacks-&-Beverages</li></p>
                    <p><li onClick={() => scrollToComponent(sharingRef)} className="cursor-pointer"> Midnight (Start at 12 am)</li></p>
                </nav>}
            </div>
            <div className="md:ml-10 hidden md:block fixed top-20 left-0 z-10 bg-black w-full">
                <button onClick={() => scrollToComponent(everydayRef)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    EVERYDAY VALUE
                </button>
                <button onClick={() => scrollToComponent(alaRef)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    ALA-CARTE-&-COMBOS
                </button>
                <button onClick={() => scrollToComponent(promotionRef)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    PROMOTION
                </button>
                <button onClick={() => scrollToComponent(signatureRef)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    SIGNATURE-BOXES
                </button>
                <button onClick={() => scrollToComponent(sharingRef)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">SHARING</button>
                <button onClick={() => scrollToComponent(sharingRef)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> Snacks-&-Beverages</button>
                <button onClick={() => scrollToComponent(sharingRef)} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Midnight (Start at 12 am)</button>
            </div>
            {/* Your components with refs */}
            <Everyday ref={everydayRef} />
            <ALA ref={alaRef} />
            <PROMOTION ref={promotionRef} />
            <SIGNATURE ref={signatureRef} />
            <SHARING ref={sharingRef} />
            <Footer />
            <KommunicateChat />

        </div>
    );
};

export default Home;
