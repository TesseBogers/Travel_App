import React, { useState, useEffect } from 'react';
import heroOne from '/src/assets/images/hero/1.jpg';
import heroTwo from '/src/assets/images/hero/2.jpg';
import heroThree from '/src/assets/images/hero/3.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const heroImages = [heroOne, heroTwo, heroThree];
    const heroTitles = ["Tour Travel & Adventure", "Rest Explore & Camp", "Travel & Adventure"];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === heroImages.length - 1 ? 0 : activeIndex + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, heroImages.length]);

    return (
        <section className="hero-section relative bg-gray-100 w-full h-screen overflow-x-hidden">
            <div className="hero-wrapper-three w-full h-full overflow-hidden relative">
                <div className="hero-arrows right-0 top-1/2 transform -translate-y-1/2 space-x-4 pr-8 absolute">
                    <button onClick={() => setActiveIndex(activeIndex === 0 ? heroImages.length - 1 : activeIndex - 1)} className="bg-white p-2 rounded-full shadow-md">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button onClick={() => setActiveIndex(activeIndex === heroImages.length - 1 ? 0 : activeIndex + 1)} className="bg-white p-2 rounded-full shadow-md">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
                {heroImages.map((image, index) => (
                    <div key={index} className={`single-slider absolute w-full h-full ${index === activeIndex ? 'block' : 'hidden'} transition-transform duration-500 ease-in-out`}>
                        <div className="image-layer w-full h-full bg-cover bg-center -mt-[8rem] " style={{backgroundImage: `url(${image})`}}></div>
                        <div className="hero-content absolute left-0 bottom-0 ml-8 mb-8 text-black">
                            <span className="sub-title text-sm uppercase tracking-widest mb-2 block text-black">Welcome to Java Travels</span>
                            <h1 className="font-bold text-4xl mb-4 text-black">{heroTitles[index]}</h1>
                            <div className="hero-button space-x-4">
                                <a href="#" className="main-btn primary-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                    <span>Explore More</span>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </a>
                                <a href="#" className="main-btn secondary-btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <span>Learn More</span>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Hero;