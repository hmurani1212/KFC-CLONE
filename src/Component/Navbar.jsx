import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const Navbar = () => {
    const getAuth = localStorage.getItem("AuthToken");
    const [nav, setnav] = useState(false)
    const HandleNavbar = () => {
        setnav(!nav);
    };
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //       // Check if the clicked element is not part of the navbar
    //       if (event.target.closest('#navbar') === null) {
    //         // Modify the navbar visibility when clicked outside
    //         setnav(false);
    //       }
    //     };
    
    //     // Add a click event listener to the document
    //     document.addEventListener('click', handleClickOutside);
    
    //     // Clean up the event listener on component unmount
    //     return () => {
    //       document.removeEventListener('click', handleClickOutside);
    //     };
    //   }, []);
    return (
        <>
            <nav className="border-gray-200  bg-black dark:bg-gray-900 md:ml-10 fixed top-0 left-0 w-full z-10">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <span className="self-center mx-5 text-3xl font-bold font-mono  whitespace-nowrap dark:text-white ">
                            KFC
                        </span>
                        <Link to="/Delivery">
                            <button className="relative bg-black inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400   dark:text-white">
                                <span className="relative text-white px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md text-base font-bold">
                                    DELIVERY
                                </span>
                            </button>
                        </Link>
                        <button type="button" className="text-white font-bold  bg-gray-800 hover:bg-gray-900 focus:outline-none   rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">PICKUP</button>

                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center  md:my-0 p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 bg bg-black text-white"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                        onClick={HandleNavbar}>
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium bg-black flex flex-col p-4 md:p-0 mt-4 border  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <Link to="/OrderDetails">
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    < AddShoppingCartIcon />
                                </button>
                            </Link>
                            {!getAuth ? <Link to="/Sign">
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    Login
                                </button>
                            </Link>
                                :
                                <Link to="/Profile">
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Profile
                                    </button>
                                </Link>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {nav && <nav className="border-gray-200 md:hidden bg-black dark:bg-gray-900 md:ml-10 fixed top-10 right-20 z-50 p-4">
                <Link to="/OrderDetails">
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        < AddShoppingCartIcon />
                    </button>
                    <br />
                </Link>
                {!getAuth ? <Link to="/Sign">
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Login
                    </button>
                </Link>
                    :
                    <Link to="/Profile">
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Profile
                        </button>
                    </Link>
                }
            </nav>}

            <Outlet />
        </>
    )
};


export default Navbar;
