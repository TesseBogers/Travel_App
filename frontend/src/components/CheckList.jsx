import React, { useState } from 'react';
import ChooseButton from './ChooseButton';
import InsideCheckListFood from './InsideCheckListFood';
import InsideCheckListAttractions from './InsideCheckListAttraction';
import InsideCheckListHousing from './InsideCheckListHousing.jsx';

export default function App() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="App">
            <h1 className="titlebutton">What would you like to do?</h1>
            <ChooseButton handleButtonClick={handleButtonClick} />
            <div className="containerCheckList">
                {selectedOption === 'Food' && <InsideCheckListFood />}
                {selectedOption === 'Attractions' && <InsideCheckListAttractions />}
                {selectedOption === 'Housing' && <InsideCheckListHousing />}
            </div>
        </div>
    );
}