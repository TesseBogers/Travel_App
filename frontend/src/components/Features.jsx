import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faMapMarkerAlt, faMapSigns, faCompass } from "@fortawesome/free-solid-svg-icons";

const Features = () => (
    <section className="pb-24 pt-24 bg-center mx-[6rem]" style={{ backgroundImage: "url(images/shape4.png)" }}>
        <div className="container mx-auto">

            <div className="text-center mx-auto w-1/2 mb-24">
                <h4 className="text-theme1 text-md uppercase tracking-widest mb-4 text-brand-blue-0-shades font-signika-negative font-bold">4 Steps to the Perfect Journey</h4>
                <h2 className="mb-4 font-bold text-6xl text-bg-brand-blue-60-shades tracking-tight">Find <span className="text-theme">Travel Perfection</span></h2>
                <p className="text-md font-inder">Embark on a journey of travel perfection with our comprehensive Four-step guide.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {createFeatureCard(faFlag, "Tell Us What You Want To Do", "Tell us your preferences, and we'll create your perfect itinerary")}
                {createFeatureCard(faMapMarkerAlt, "Share Your Travel Locations", "Share your travel locations for personalized recommendations.")}
                {createFeatureCard(faMapSigns, "Share Your Travel Preference", "Let us know your preferences for a customized travel experience.")}
                {createFeatureCard(faCompass, "Believe We are 100% Trusted", "Trust us completely for 100% reliable service.")}
            </div>

        </div>
        <div className="bg-white opacity-50"></div>
    </section>
);

const createFeatureCard = (icon, title, description) => (
    <div className="feature-card text-center p-8 py-20 border border-solid rounded bg-white relative">
        <div className="feature-card-content relative z-10">
            <FontAwesomeIcon icon={icon} className="icon-card text-theme text-6xl mb-6 text-brand-blue-0-shades transition-colors duration-500 ease-in-out" />
            <h4><a href="#" className="text-3xl font-bold font-roboto transition-colors duration-500 ease-in-out">{title}</a></h4>
            <p className="mt-3 font-inder transition-colors duration-500 ease-in-out">{description}</p>
        </div>
    </div>
);


export default Features;