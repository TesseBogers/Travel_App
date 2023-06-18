import React, { useState } from 'react';
import Food from '../components/Food';
import Housing from '../components/Housing';
import Transportation from '../components/Transportation';
import Visits from '../components/Visits';
import '../components/TravelOrganizer.css';
import ArrowLeft from '../assets/images/before.png';
import ArrowRight from '../assets/images/next.png';

const TravelOrganizer = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const days = [
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' },
    { name: 'Sunday' },
  ];

  const handlePrevDay = () => {
    setCurrentDay((prevDay) => (prevDay === 0 ? days.length - 1 : prevDay - 1));
  };

  const handleNextDay = () => {
    setCurrentDay((prevDay) => (prevDay === days.length - 1 ? 0 : prevDay + 1));
  };

  return (
    <div className='flex flex-col'>
      <div className=''>
        <h2 className="text-xl font-black font-roboto text-palette-dark-color-3">
          {days[currentDay].name}
        </h2>
        <div className='grid grid-cols-2'>
          <Transportation />
          <Housing />
          <Visits />
          <Food />
        </div>
      </div>
      <div className='flex gap-2 mx-auto'>
        {currentDay > 0 && (
          <button className="arrow-button" onClick={handlePrevDay}>
            <span className="arrow-left">
              <img src={ArrowLeft} alt="ArrowLeft" />
            </span>
          </button>
        )}
        {currentDay < days.length - 1 && (
          <button className="arrow-button" onClick={handleNextDay}>
            <span className="arrow-right">
              <img src={ArrowRight} alt="" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TravelOrganizer;



