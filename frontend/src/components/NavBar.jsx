import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faEnvelope, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { faSearch, faAngleDown, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({left: 0, top: 0});

    const toggleDropdown = (name, e) => {
        if (activeDropdown === name) {
            setActiveDropdown('');
        } else {
            setActiveDropdown(name);
            const rect = e.target.getBoundingClientRect();
            setDropdownPosition({left: rect.left, top: rect.bottom});
        }
    };

    return (
        <>
        <div className="w-screen py-4 px-16 overflow-x-hidden font-signika-negative text-md">
            <div className="">
                <div className="flex justify-between">
                    <div className="w-full h-auto">
                        <div className="site-branding">
                            <Link to="/" className="brand-logo">
                                <img src="/images/logo.png" alt="Logo" className="w-[200px] h-auto object-contain"/>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full ">
                        <div className="information-wrapper">
                            <div className="flex justify-end gap-16">
                                <div className="">
                                    <div className="single-info-item-two">
                                        <div className="inner-info flex items-center">
                                            <div className="icon flex justify-center items-center bg-white rounded-full w-10 h-10 border border-palette-light-color-5">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-palette-light-color-5" />
                                            </div>
                                            <div className="info self-center ml-4 flex-shrink-0">
                                                <h5>Ghent, Belgium</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="single-info-item-two">
                                        <div className="inner-info flex items-center">
                                            <div className="icon flex justify-center items-center bg-white rounded-full w-10 h-10 border border-palette-light-color-5">
                                                <FontAwesomeIcon icon={faEnvelope} className="text-palette-light-color-5" />
                                            </div>
                                            <div className="info self-center ml-4 flex-shrink-0">
                                                <h5><a href="mailto:support@gmail.com">support-java@gmail.com</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="single-info-item-two">
                                        <div className="inner-info flex items-center">
                                            <div className="icon flex justify-center items-center bg-white rounded-full w-10 h-10 border border-palette-light-color-5">
                                                <FontAwesomeIcon icon={faPhone} className="text-palette-light-color-5" />
                                            </div>
                                            <div className="info self-center ml-4 flex-shrink-0">
                                                <h5><a href="tel:+000(123)45688">03 123 456</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <div className="header-navigation navigation-white text-white bg-black rounded-xl py-6 px-8 mx-16">
                <div className="primary-menu flex relative justify-between items-center">
                    <nav className="main-menu inline-block relative mx-4 self-center">
                        <ul className="flex flex-row items-center justify-center">
                            <li className="menu-item mx-4">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/timeline">Timeline</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="trip-organizer">Trip Organizer</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/chat">Chat</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/recreation">Recreation</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="nav-menu flex flex-row justify-between items-center gap-8">
                        <div className="flex items-center justify-center relative">
                            <button
                                className="flex items-center justify-center absolute right-0 cursor-pointer w-12 h-12 rounded-full transition-all duration-200 outline-none border-none bg-transparent"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                            <input
                                placeholder={isFocused ? 'search..' : ''}
                                className={`border-none h-12 p-2.5 outline-none rounded-full transition-all duration-500 ease-in-out text-white focus:outline-none active:outline-none focus:border-transparent focus:ring-0 ${isFocused ? 'w-64 bg-transparent border-b-2 border-purple-600' : 'w-12 bg-palette-light-color-3'}`}
                                name="text"
                                type="text"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </div>

                        <div className="nav-right-item flex flex-row gap-8">
                            <div className="menu-button hidden xl:flex items-center bg-palette-light-color-4 text-white py-2 rounded-full">
                                <Link to="#" className="main-btn primary-btn flex items-center justify-between ml-8 no-underline">
                                    Book Now
                                    <span className="ml-3 bg-blue-600 rounded-full inline-flex items-center justify-center h-12 w-12 mr-1">
                                        <FontAwesomeIcon icon={faPaperPlane}/>
                                    </span>
                                </Link>
                            </div>
                            <Link to="/trip-organizer" className="flex flex-row gap-2 cursor-pointer self-center">
                                <FontAwesomeIcon icon={faUser} className="text-white h-[1.5rem] w-[1.5rem]"/>
                                <span className="self-center">Sign In</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar