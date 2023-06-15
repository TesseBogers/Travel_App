import React, { useState, useEffect } from 'react';
import visitsImage from "../assets/images/holstentor.png"

const Visits = () => {
  const [visits, setVisits] = useState({
    visitName: '',
    visitPrice: 0,
    visitAddress: '',
  });

  const [savedVisits, setSavedVisits] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisits((prevVisits) => ({ ...prevVisits, [name]: value }));
  };

const API_BASE_URL = 'http://localhost:4000/api/visits';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visits),
    });

    if (response.ok) {
      const savedVisits = await response.json();
      setSavedVisits(savedVisits);
      setVisits({
        visitName: '',
        visitPrice: 0,
        visitAddress: '',
      });
      localStorage.setItem('savedVisits', JSON.stringify(savedVisits));
    } else {
      throw new Error('Failed to save visits');
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const savedVisitsData = JSON.parse(localStorage.getItem('savedVisits'));
  if (savedVisitsData) {
    setSavedVisits(savedVisitsData);
  }
}, []);

  return (
    <div className='flex'>
      <div className="w-1/4">
        <img src={visitsImage} alt="Visits" className="logo" />
      </div>
      <div className="w-1/2 mx-2">
      <form onSubmit={handleSubmit}>
        <div>
          <label><h2 className='font-inder text-palette-dark-color-3'>Visit name :</h2></label>
          <input
          type="text"
          name="visitName"
          value={visits.visitName}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label><h2 className='font-inder text-palette-dark-color-3'>Visit price :</h2></label>
          <input
          type="number"
          name="visitPrice"
          value={visits.visitPrice}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label><h2 className='font-inder text-palette-dark-color-3'>Visit address :</h2></label>
          <input
          type="text"
          name="visitAddress"
          value={visits.visitAddress}
          onChange={handleInputChange}
          />
        </div>
        <button className='font-inder bg-purple-300' type="submit">Save</button>
      </form>
      </div>

      <div className="w-1/4">
      {savedVisits && (
        <div>
          <p>Housing Name : {savedVisits.visitName}</p>
          <p>Housing Price : {savedVisits.visitPrice}</p>
          <p>Housing Address : {savedVisits.visitAddress}</p>
          <button className='font-inder bg-purple-300' type="submit">Edit</button>
          <button className='font-inder bg-purple-300' type="submit">Delete</button>
        </div>
      )}
      </div>
      </div>
  );
};


export default Visits;
