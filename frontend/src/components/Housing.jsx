import React, { useState } from 'react';
import housingImage from "../assets/images/signe-de-lhotel.png";

const Housing = () => {
  const [housing, setHousing] = useState({
    housingName: '',
    housingPrice: '',
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
          housingPrice: '',
          housingAddress: '',
        });
      } else {
        throw new Error('Failed to save housing');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row my-5">
      <div className="image-container">
        <img src={housingImage} alt="Housing" />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Housing name :</h2>
            </label>
            <input
              type="text"
              name="housingName"
              value={housing.housingName}
              onChange={handleInputChange}
              placeholder="Housing Name..."
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Housing price :</h2>
            </label>
            <input
              type="number"
              name="housingPrice"
              value={housing.housingPrice}
              onChange={handleInputChange}
              placeholder="Housing Price..."
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Housing address :</h2>
            </label>
            <input
              type="text"
              name="housingAddress"
              value={housing.housingAddress}
              onChange={handleInputChange}
              placeholder="Housing Address..."
            />
          </div>
          <button className="font-inder bg-blue-400 py-2 px-6" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 px-4">
        {savedHousing && (
          <div className='text-left'>
            <p><span className='font-inder text-palette-dark-color-5'>Housing Name : </span>{savedHousing.housingName}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Housing Price: </span>{savedHousing.housingPrice}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Housing Address: </span>{savedHousing.housingAddress}</p>
            <button className="font-inder bg-green-300 py-2 px-6 my-5 mx-2" type="submit">
              Edit
            </button>
            <button className="font-inder bg-red-300 py-2 px-6 my-5 mx-2" type="submit">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Housing;

