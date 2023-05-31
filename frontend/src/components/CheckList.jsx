import React, { useState } from 'react';
import ChooseButton from './ChooseButton';
import InsideCheckListFood from './InsideCheckListFood';
import InsideCheckListAttractions from './InsideCheckListAttraction';
import InsideCheckListHousing from './InsideCheckListHousing.jsx';
import SearchButton from "./SearchButton.jsx";
export default function App() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleButtonClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="App">
            <ChooseButton handleButtonClick={handleButtonClick} />
            <div className="containerCheckList">
                {selectedOption === 'Food' && <InsideCheckListFood />}
                {selectedOption === 'Attractions' && <InsideCheckListAttractions />}
                {selectedOption === 'Housing' && <InsideCheckListHousing />}
            </div>
        </div>
    );
}