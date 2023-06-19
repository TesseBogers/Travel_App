import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faBriefcase, faFolder } from '@fortawesome/free-solid-svg-icons'

import travelImage from '/src/assets/images/aboutUs/travels.png';

const AboutUs = () => (
    <section className="pt-0 bg-cover bg-no-repeat mx-[6rem] mt-[6rem]" style={{ backgroundImage: "url(images/bg/bg-trans.png)" }}>
        <div className="container flex flex-col">
            <div className="lg:w-full">
                <div className="w-3/4 float-right">
                    <div className="attributes p-4 pb-0 bg-white rounded shadow-md">
                        <div className="flex flex-wrap">
                            <CounterItem value={20} label="Years Experiences" />
                            <CounterItem value={530} label="Tour Packages" />
                            <CounterItem value={850} label="Happy Customers" />
                            <CounterItem value={320} label="Award Winning" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6">
                <div className="flex flex-row items-center justify-between mt-[3rem] px-[6rem]">
                    <div className="lg:w-1/2 mb-4 lg:pl-4 lg:order-1">
                        <div className="overflow-hidden">
                            <img src={travelImage} alt="" />
                        </div>
                    </div>
                    <div className="lg:w-1/2 mb-4 lg:pr-4 lg:order-2">
                        <div className="text-center lg:text-left mb-4">
                            <h4 className="inline-block text-md uppercase tracking-widest mb-4 text-brand-blue-0-shades font-signika-negative font-bold">Get To Know Us</h4>
                            <h2 className="aboutUs-heading border-b pb-1 font-bold text-6xl mb-2 text-bg-brand-blue-60-shades tracking-tight">Explore your dream Tour with us.</h2>
                            <p className="border-b mb-2 pb-2 font-inder text-base">
                                Welcome to our website where you can learn more about our team and get to know us better. Explore our wide range of tour packages that will take you on an unforgettable journey around the world, immersing you in unique cultures and breathtaking landscapes.<br /><br />Join us and let us create memories that will last a lifetime.
                            </p>
                            <div className="flex justify-between">
                                <ul className="flex flex-row gap-8 font-inder">
                                    <li><FontAwesomeIcon icon={faLocationArrow} className="text-brand-blue-0-shades" /> Tour Guide</li>
                                    <li><FontAwesomeIcon icon={faBriefcase} className="text-brand-blue-0-shades" /> Friendly Price</li>
                                    <li><FontAwesomeIcon icon={faFolder} className="text-brand-blue-0-shades" /> Reliable Tour Package</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white opacity-50"></div>
    </section>
);

const CounterItem = ({ value, label }) => (
    <div className="lg:w-1/4 md:w-1/2 sm:w-1/2 mb-4 p-4">
        <div className="counter-content ml-2 text-center">
            <h2 className="value mb-0 text-6xl font-bold font-roboto text-brand-blue-0-shades">{value}</h2>
            <span className="m-0 font-inder text-base">{label}</span>
        </div>
    </div>
);

export default AboutUs;