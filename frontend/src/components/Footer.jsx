import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(fab);
import ImageOne
    from '../assets/images/instagram/a-woman-traveling-in-the-caucasus-mountain-sports-2022-01-19-00-15-28-utc.jpg';
import ImageTwo
    from '../assets/images/instagram/adventure-travel-tourism-hike-and-people-concep-2021-08-26-17-35-10-utc.jpg'
import ImageThree
    from '../assets/images/instagram/beautiful-beach-in-cove-under-cliffs-people-on-be-2022-11-14-17-05-04-utc.a1Uernnc.jpg';
import ImageFour
    from '../assets/images/instagram/group-of-smiling-friends-hiking-with-backpacks-out-2022-01-18-23-40-08-utc.jpg';
import ImageFive
    from '../assets/images/instagram/poland-polska-kazimierz-dolny-tourism-travel-2022-11-16-10-04-38-utc.jpeg';
import ImageSix
    from '../assets/images/instagram/tourist-couple-traveling-travel-walking-on-stree-2022-02-02-04-50-26-utc.jpg';
import ImageSeven
    from '../assets/images/instagram/travel-tourism-camera-photograph-wanderlust-concep-2022-12-15-23-17-55-utc.jpg';
import ImageEight from '../assets/images/instagram/wanderlust-and-travel-concept-2021-12-27-21-28-51-utc.jpg';
import ImageNine from '../assets/images/instagram/woman-traveling-in-venice-2021-12-09-07-25-53-utc.jpg'

const Instagram = () => {
    const imageSrc = [ImageOne, ImageTwo, ImageThree, ImageFour, ImageFive, ImageSix, ImageSeven, ImageEight, ImageNine];

    const duplicateImageSrc = imageSrc.concat(imageSrc);

    const carouselTrackRef = useRef(null);

    useEffect(() => {
        const carouselTrack = carouselTrackRef.current;
        if (!carouselTrack) return;

        let speed = 0.8;

        const animate = () => {
            const firstImageWidth = carouselTrack.children[0].offsetWidth;

            carouselTrack.style.transform = `translateX(${-speed}px)`;
            speed += 0.8;

            if (speed >= firstImageWidth) {
                carouselTrack.appendChild(carouselTrack.children[0]);
                carouselTrack.style.transition = "none";
                carouselTrack.style.transform = "translateX(0)";
                speed = 0.8;

                void carouselTrack.offsetWidth;

                carouselTrack.style.transition = "";
            }
            requestAnimationFrame(animate);
        };
        const animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);

    }, []);

    return (
        <div className="insta-inner flex flex-row justify-center items-center mb-20">
            <div className="follow-button absolute z-10 inset-x-0 top-38 flex justify-center rounded-full py-3 bg-white text-blue-950 w-fit px-10 mx-auto">
                <a href="https://www.instagram.com" target={"_blank"}
                   className="m-0 rounded flex items-center justify-center text-blue-950 gap-2 font-inder text-lg font-bold">
                    <FontAwesomeIcon icon={['fab', 'instagram']}/> Follow Us on Instagram
                </a>
            </div>
            <div className="carousel mx-auto w-full h-full relative overflow-hidden">
                <div ref={carouselTrackRef} className="carousel-track flex">
                    {duplicateImageSrc.map((src, index) => (
                        <div key={index} className="carousel-item px-1 flex-shrink-0" style={{width: '200px', height: '200px'}}>
                            <div className="image-overlay relative" style={{width: '200px', height: '200px'}}>
                                <img src={src} alt="insta" className="object-cover opacity-[0.3] image-with-overlay" style={{width: '200px', height: '200px'}}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const FooterUpper = () => {
    return (<div className="footer-upper pb-20 px-[4rem]">
            <div className="container mx-auto">
                <div className="flex flex-row gap-6">
                    <FooterAbout/>
                    <QuickLinks/>
                    <Categories/>
                    <Newsletter/>
                </div>
            </div>
        </div>);
};

const FooterAbout = () => {
    return (<div className="">
            <div className="footer-about">
                <img src="/images/logo.png" alt="Logo" className="object-contain w-[300px] h-auto mb-10"/>
                <p className="footer-about-body mt-3 mb-3 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque
                    iaculis molestie sagittis maecenas aenean eget molestie sagittis.
                </p>
                <ul>
                    <li className="text-white"><strong>Location:</strong> Java Street, Antwerp, Belgium</li>
                    <li className="text-white"><strong>Email:</strong> info@java.com</li>
                    <li className="text-white"><strong>Website:</strong> www.java.com</li>
                </ul>
            </div>
        </div>);
};

const QuickLinks = () => {
    const links = ['About Us', 'Information', 'Policy', 'Terms', 'Service'];
    return (<div className="lg:col-span-2 md:col-span-6 col-span-12 mb-4 mr-10">
            <div className="footer-links">
                <h3 className="text-white font-inder text-xl inline-flex flex-nowrap">Links</h3>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}><a href="#" className="text-white font-roboto">{link}</a></li>))}
                </ul>
            </div>
        </div>);
};

const Categories = () => {
    const categories = ['Travel', 'Technology', 'Lifestyle', 'Destinations', 'Entertainment', 'Business'];
    return (<div className="lg:col-span-2 md:col-span-6 col-span-12 mb-4 mr-10">
            <div className="footer-links">
                <h3 className="text-white font-inder text-xl">Categories</h3>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}><a href="#" className="text-white font-roboto">{category}</a></li>))}
                </ul>
            </div>
        </div>);
};

const Newsletter = () => {
    return (<div className="lg:col-span-4 md:col-span-6 col-span-12">
            <div className="footer-links">
                <h3 className="text-white font-inder text-xl">Newsletter</h3>
                <p className="text-white mb-6 font-roboto">Subscribe to our weekly Newsletter and receive updates via
                    email.</p>
                <div className="newsletter-box flex flex-row gap-3">
                    <input type="email" name="Email" placeholder="Email Address*"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <i className="far fa-envelope"></i>
                    <button type="submit"
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded">Subscribe
                    </button>
                </div>
            </div>
        </div>);
};

const FooterCopyright = () => {
    const socialIcons = [
        {icon: faFacebookF, url: "#"},
        {icon: faTwitter, url: "#"},
        {icon: faLinkedinIn, url: "#"},
        {icon: faInstagram, url: "#"},
    ];
    return (
        <div className="footer-copyright">
            <div className="container mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="">
                        <p>© 2023 JavaTravels - All rights reserved. Designed by
                            <a href="#" target="_blank" rel="noopener noreferrer" className="mx-1">The Javas.</a>
                        </p>
                    </div>
                    <div className="">
                        <div className="footer-social">
                            <ul className="flex flex-row space-x-6 text-white">
                                {socialIcons.map((social, index) => (
                                    <li key={index} className="hover:bg-white hover:bg-opacity-20 rounded-full p-4 text-2xl transition duration-200">
                                        <a href={social.url} className="text-white">
                                            <FontAwesomeIcon icon={social.icon}/>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    {
        return (<footer className="footer section p-[6rem]">
                <Instagram/>
                <FooterUpper/>
                <FooterCopyright/>
            </footer>);
    }
}

export default Footer;