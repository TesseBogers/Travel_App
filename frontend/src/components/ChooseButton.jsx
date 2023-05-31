import React from 'react';
import foodImage from '../components/Pictures/food.jpg';
import housingImage from '../components/Pictures/housing.jpg';
import attractionsImage from '../components/Pictures/attraction.jpg';

export default function ChooseButton({ handleButtonClick }) {
    const buttonBackgrounds = {
        Food: foodImage,
        Housing: housingImage,
        Attractions: attractionsImage
    };

    const optionButtons = ['Food', 'Housing', 'Attractions'];

    return (
        <>
            <h1>What would you like to do?</h1>
            <ul className="list-group">
                {optionButtons.map((optionButton) => (
                    <button
                        key={optionButton}
                        className="zoom-button"
                        style={{
                            backgroundImage: `url(${buttonBackgrounds[optionButton]})`,
                        }}
                        onClick={() => handleButtonClick(optionButton)}
                    >
                        {optionButton}
                    </button>
                ))}
            </ul>
        </>
    );
}