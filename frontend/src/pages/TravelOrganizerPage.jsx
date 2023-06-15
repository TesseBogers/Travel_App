import React, { useState } from 'react';
import Food from '../components/Food';
import Housing from '../components/Housing';
import Transportation from '../components/Transportation';
import Visits from '../components/Visits';
import '../components/TravelOrganizer.css';

const TravelOrganizer = () => {
  const [currentDay, setCurrentDay] = useState(0);

  const handlePrevDay = () => {
    setCurrentDay((prevDay) => prevDay - 1);
  };

  const handleNextDay = () => {
    setCurrentDay((prevDay) => prevDay + 1);
  };

  return (
    <div className="travel-organizer">
      <div className="row">
      <h2 className="text-xl font-black font-inder text-palette-dark-color-3">
            {days[currentDay].name}
          </h2>
        <div className="col grid gap-4 grid-cols-2 grid-rows-2 py-4">
          <Transportation />
          <Housing />
          <Visits />
          <Food />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {currentDay > 0 && (
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded"
            onClick={handlePrevDay}
          >
            Previous Day
          </button>
        )}
        {currentDay < days.length - 1 && (
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded"
            onClick={handleNextDay}
          >
            Next Day
          </button>
        )}
      </div>
    </div>
  );
};

const days = [
  { name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Thursday' },
  { name: 'Friday' },
  { name: 'Saturday' },
  { name: 'Sunday' },
];

export default TravelOrganizer;

