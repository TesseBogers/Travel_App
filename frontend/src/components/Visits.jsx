import React, { useState, useEffect } from 'react';
import visitsImage from "../assets/images/holstentor.png";

const Visits = () => {
  const [visits, setVisits] = useState({
    visitName: '',
    visitPrice: '',
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
          visitPrice: '',
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
    <div className='flex flex-row my-5'>
      <div className='image-container'>
        <img src={visitsImage} alt="Visits" />
      </div>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4'>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Visit name :</h2>
            </label>
            <input
              type="text"
              name="visitName"
              value={visits.visitName}
              onChange={handleInputChange}
              placeholder='Visit Name...'
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Visit price :</h2>
            </label>
            <input
              type="number"
              name="visitPrice"
              value={visits.visitPrice}
              onChange={handleInputChange}
              placeholder='Visit Price...'
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Visit address :</h2>
            </label>
            <input
              type="text"
              name="visitAddress"
              value={visits.visitAddress}
              onChange={handleInputChange}
              placeholder='Visit Adress...'
            />
          </div>
          <button className="font-inder bg-blue-400 py-2 px-6" type="submit text-lg font-bold font-inder">Save</button>
        </form>
      </div>

      <div className='flex flex-col gap-4 px-4'>
        {savedVisits && (
          <div>
            <p>Visit Name: {savedVisits.visitName}</p>
            <p>Visit Price: {savedVisits.visitPrice}</p>
            <p>Visit Address: {savedVisits.visitAddress}</p>
            <button className="font-inder bg-green-300 py-2 px-6" type="submit text-lg font-bold font-inder">Edit</button>
            <button className="font-inder bg-red-300 py-2 px-6" type="submit text-lg font-bold font-inder">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visits;
