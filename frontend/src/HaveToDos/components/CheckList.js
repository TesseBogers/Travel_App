import React, { useState } from 'react';
import ChooseButton from './ChooseButton';
import InsideCheckListFood from './InsideCheckListFood';
import InsideCheckListAttractions from './InsideCheckListAttractions';
import InsideCheckListHousing from './InsideCheckListHousing';

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <ChooseButton handleButtonClick={handleButtonClick} />
      <div className="checkList" style={{ height: '500px', width: '200px', backgroundColor: 'black', marginLeft: '100px' }}>
        {selectedOption === 'Food' && <InsideCheckListFood />}
        {selectedOption === 'Attractions' && <InsideCheckListAttractions />}
        {selectedOption === 'Housing' && <InsideCheckListHousing />}
      </div>
    </div>
  );
}