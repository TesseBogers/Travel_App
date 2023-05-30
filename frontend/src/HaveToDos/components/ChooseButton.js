import React, { useState } from 'react';
import foodImage from '../../pictures/foodImage.jpg';
import housingImage from '../../pictures/housingImage.jpg';
import attractionsImage from '../../pictures/attractionsImage.jpg';

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
        {optionButtons.map((optionButton, index) => (
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
