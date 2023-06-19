import React, {useState, useEffect, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import heroOne from "../assets/images/hero/1.jpg";
import heroTwo from "../assets/images/hero/3.jpg";
import heroThree from "../assets/images/hero/4.jpg";
import heroFour
    from "../assets/images/hero/group-of-friends-hiking-through-countryside-togeth-2021-08-29-17-10-45-utc (1).jpg";
import heroFive
    from "../assets/images/hero/group-of-happy-friends-with-backpacks-hiking-toget-2021-08-28-14-50-24-utc.jpg";
import heroSix
    from "../assets/images/hero/happy-man-on-top-of-elbrus-mountain-winter-hiking-2021-09-01-09-38-47-utc.jpg";
import heroSeven from "../assets/images/hero/mount-everest-base-camp-2023-01-03-22-41-25-utc.jpg";
import heroEight
    from "../assets/images/hero/young-couple-doing-nordic-walking-in-the-mountains-2021-10-27-22-46-05-utc.jpg";

const heroImages = [heroOne, heroTwo, heroThree, heroFour, heroFive, heroSix, heroSeven, heroEight];

const HeroImageCarousel = () => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveImageIndex((prevIndex) => prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1);
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleImageLoad = (index) => {
        setImagesLoaded((prev) => [...prev, index]);
    };

    const handlePrev = () => {
        setActiveImageIndex((prevIndex) => prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1);
    };

    const handleNext = () => {
        setActiveImageIndex((prevIndex) => prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1);
    };

    return (<div className="image-container relative overflow-hidden flex flex-col">

                {heroImages.map((image, index) => (<img
                        key={index}
                        onLoad={() => handleImageLoad(index)}
                        className={`image absolute transition-all duration-4000 ease-in-out ${index === activeImageIndex ? "opacity-100 visible" : "opacity-0 invisible"}`}
                        src={image}
                        alt={`carousel img-${index}`}
                        style={{
                            display: imagesLoaded.includes(index) ? "block" : "none",
                        }}
                    />))}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 pb-2">
                <button onClick={handlePrev} className="bg-gray-50 p-2 rounded-full w-[50px] h-[50px]">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-brand-blue-30-shades"/>
                </button>
                <button onClick={handleNext} className="bg-gray-50 p-2 rounded-full w-[50px] h-[50px]">
                    <FontAwesomeIcon icon={faChevronRight} className="text-brand-blue-30-shades"/>
                </button>
            </div>
        </div>);
};

export default HeroImageCarousel;