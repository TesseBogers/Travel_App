import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const heroTitles = ["Tour Travel & Adventure", "Rest Explore & Camp", "Travel & Adventure"];

const HeroContent = ({ heroTitles, activeIndex }) => (
    <div className="hero-content flex flex-col justify-center items-start p-8">
        <span className="sub-title text-md uppercase tracking-widest mb-2 block font-bold leading-tight font-signika-negative text-brand-blue-30-shades">Welcome to Java Travels</span>
        <h1 className="hero-titles font-bold text-6xl mb-10 text-bg-brand-blue-60-shades font-roboto">{heroTitles[activeIndex % heroTitles.length]}</h1>
        <div className="hero-button space-x-4">
            <a href="#" className="main-btn primary-btn bg-brand-blue-0-shades hover:bg-brand-blue-30-shades text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2 font-inder text-xl">
                <span>Explore More</span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </a>
            <a href="#" className="main-btn secondary-btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2 font-inder text-xl">
                <span>Learn More</span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </a>
        </div>
    </div>
);

export default HeroContent;
