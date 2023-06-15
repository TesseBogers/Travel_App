import React, { useState, useEffect } from 'react';
import housingImage from "../assets/images/hotel.png"

const Housing = () => {
  const [housing, setHousing] = useState({
    housingName: '',
    housingPrice: 0,
    housingAddress: '',
  });

  const [savedHousing, setSavedHousing] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHousing((prevHousing) => ({ ...prevHousing, [name]: value }));
  };

const API_BASE_URL = 'http://localhost:4000/api/housing';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(housing),
    });

    if (response.ok) {
      const savedHousing = await response.json();
      setSavedHousing(savedHousing);
      setHousing({
        housingName: '',
        housingPrice: 0,
        housingAddress: '',
      });
      localStorage.setItem('savedHousing', JSON.stringify(savedHousing));
    } else {
      throw new Error('Failed to save housing');
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const savedHousingData = JSON.parse(localStorage.getItem('savedHousing'));
  if (savedHousingData) {
    setSavedHousing(savedHousingData);
  }
}, []);


  return (
    <div className="flex">
      <div className="icons w-1/4">
        <img src={housingImage} alt="Housing" className="logo" />
      </div>
      <div className="w-1/2 mx-2">
      <form onSubmit={handleSubmit}>
        <div>
          <label><h2 className='font-inder text-palette-dark-color-3'>Housing name :</h2></label>
          <input
          type="text"
          name="housingName"
          value={housing.housingName}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label><h2 className='font-inder text-palette-dark-color-3'>Housing price :</h2></label>
          <input
          type="number"
          name="housingPrice"
          value={housing.housingPrice}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label><h2 className='font-inder text-palette-dark-color-3'>Housing address :</h2></label>
          <input
          type="text"
          name="housingAddress"
          value={housing.housingAddress}
          onChange={handleInputChange}
          />
        </div>
        <button className='font-inder bg-purple-300' type="submit">Save</button>
      </form>
      </div>

      <div className="w-1/4">
      {savedHousing && (
        <div>
          <p>Housing Name : {savedHousing.housingName}</p>
          <p>Housing Price : {savedHousing.housingPrice}</p>
          <p>Housing Address : {savedHousing.housingAddress}</p>
          <button className='font-inder bg-purple-300' type="submit">Edit</button>
          <button className='font-inder bg-purple-300' type="submit">Delete</button>
        </div>
      )}
    </div>
    </div>
  );
};


export default Housing;