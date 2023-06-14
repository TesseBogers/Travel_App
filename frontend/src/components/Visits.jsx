import React, { useState } from 'react';
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
    } else {
      throw new Error('Failed to save visits');
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className='flex'>
      <div className="w-1/4">
        <img src={visitsImage} alt="Visits" className="logo" />
      </div>
      <div className="w-1/2 mx-2">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Visits Name:</label>
          <input
          type="text"
          name="visitName"
          value={visits.visitName}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Visits Price:</label>
          <input
          type="number"
          name="visitPrice"
          value={visits.visitPrice}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Visits Address:</label>
          <input
          type="text"
          name="visitAddress"
          value={visits.visitAddress}
          onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      </div>

      <div className="w-1/4">
      {savedVisits && (
        <div>
          <p>Housing Name : {savedVisits.visitName}</p>
          <p>Housing Price : {savedVisits.visitPrice}</p>
          <p>Housing Address : {savedVisits.visitAddress}</p>
        </div>
      )}
      </div>
      </div>
  );
};


export default Visits;
