import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone, faSearch, faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <header className="header-area header-three">
            <div className="header-top-bar -z-50">
                <div className="container-fluid">
                    <div className="flex flex-row justify-between -z-50">
                        <div className="py-10">
                            <div className="site-brading ml-20">
                                <Link to="/" className="brand-logo">
                                    <img src="/images/logo.png" alt="Logo" className="object-contain w-[200px] h-auto" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-12 self-center mr-20">
                            <div className="information-wrapper">
                                <div className="flex flex-row gap-16">
                                    <Information icon={faMapMarkerAlt} title="Office Address" details="583 Main Street, Antwerp" />
                                    <Information icon={faEnvelope} title="Email Address" details="support@gmail.com" />
                                    <Information icon={faPhone} title="Drop a Line" details="+03 (123) 456 78" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="header-navigation navigation-white text-white bg-black rounded-xl py-6 px-8 mx-16 z-50">
                <div className="primary-menu flex relative justify-between items-center">
                    <nav className="main-menu inline-block relative mx-4 self-center font-bold font-roboto">
                        <ul className="flex flex-row items-center justify-center">
                            <li className="menu-item mx-4">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/timeline">Timeline</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/trip-organizer">Travel Organizer</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/chat">Chat</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/recreation">Recreation</Link>
                            </li>
                            <li className="menu-item mx-4">
                                <Link to="/admin">Admin</Link>
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
                            <div className="menu-button hidden xl:flex items-center bg-brand-blue-60-light text-brand-blue-60-shades font-bold py-2 rounded-full">
                                <Link to="#" className="main-btn primary-btn flex items-center justify-between ml-8 no-underline">
                                    Book Now
                                    <span className="ml-3 bg-brand-blue-0-shades rounded-full inline-flex items-center justify-center h-12 w-12 mr-1 text-white">
                                        <FontAwesomeIcon icon={faPaperPlane}/>
                                    </span>
                                </Link>
                            </div>
                            <Link to="/profile" className="flex flex-row gap-2 cursor-pointer self-center">
                                <FontAwesomeIcon icon={faUser} className="text-white h-[1.5rem] w-[1.5rem]"/>
                                <span className="self-center font-bold font-roboto">Profile</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}

const Information = ({ icon, title, details }) => (
    <div className="col-lg-4">
        <div className="single-info-item-two">
            <div className="inner-info">
                <div className="icon flex justify-center items-center">
                    <FontAwesomeIcon icon={icon} className="text-brand-blue-60-light"  />
                </div>
                <div className="info">
                    <span className="title text-brand-blue-60-light text-sm">{title}</span>
                    <h5 className="heading-header font-inder font-bold text-brand-blue-90-shades mt-1 text-sm">{details}</h5>
                </div>
            </div>
        </div>
    </div>
);

export default Header;