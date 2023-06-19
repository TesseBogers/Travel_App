import React, { useState, useEffect } from 'react';
import HeroContent, {heroTitles} from "./HeroContent.jsx";
import HeroImageCarousel from "./HeroImageCarousel.jsx";

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === heroTitles.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-section flex justify-center mt-[8rem] m-[3rem]">
            <div className="flex flex-1 justify-center items-center">
                <HeroImageCarousel />
            </div>
            <div className="flex flex-1 justify-center items-center">
                <HeroContent heroTitles={heroTitles} activeIndex={activeIndex} />
            </div>
        </section>
    );
}

export default Hero;