import React, { useState } from 'react';
import Food from '../components/Food';
import Housing from '../components/Housing';
import Transportation from '../components/Transportation';
import Visits from '../components/Visits';
import '../components/TravelOrganizer.css';
import ArrowLeft from '../assets/images/contour-du-bouton-circulaire-fleche-arriere-gauche.png';
import ArrowRight from '../assets/images/contour-du-bouton-circulaire-fleche-droite.png';

const TravelOrganizer = () => {
    const [currentDay, setCurrentDay] = useState(0);
    const [foodData, setFoodData] = useState([]);
    const [housingData, setHousingData] = useState([]);
    const [transportationData, setTransportationData] = useState([]);
    const [visitsData, setVisitsData] = useState([]);

    const days = [
        { name: 'Monday' },
        { name: 'Tuesday' },
        { name: 'Wednesday' },
        { name: 'Thursday' },
        { name: 'Friday' },
        { name: 'Saturday' },
        { name: 'Sunday' },
    ];

    const handleFoodData = (data) => {
        const updatedData = [...foodData];
        updatedData[currentDay] = data;
        setFoodData(updatedData);
    };

    const handleHousingData = (data) => {
        const updatedData = [...housingData];
        updatedData[currentDay] = data;
        setHousingData(updatedData);
    };

    const handleTransportationData = (data) => {
        const updatedData = [...transportationData];
        updatedData[currentDay] = data;
        setTransportationData(updatedData);
    };

    const handleVisitsData = (data) => {
        const updatedData = [...visitsData];
        updatedData[currentDay] = data;
        setVisitsData(updatedData);
    };

    return (
        <div className='flex flex-col'>
            {days.map((day, index) => (
                <div
                    key={index}
                    className={`day ${index === currentDay ? 'active' : ''}`}
                >
                    <h1 className="font-bold font-roboto text-palette-light-color-3">
                        {day.name}
                    </h1>
                    <div className='container grid grid-cols-2 my-9 px-12'>
                        <Transportation
                            data={transportationData[index]}
                            setData={handleTransportationData}
                        />
                        <Housing
                            data={housingData[index]}
                            setData={handleHousingData}
                        />
                        <Visits
                            data={visitsData[index]}
                            setData={handleVisitsData}
                        />
                        <Food
                            data={foodData[index]}
                            setData={handleFoodData}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TravelOrganizer;





