import React, { useState } from 'react';
import visitsImage from '../assets/images/parthenon.png';

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
      } else {
        throw new Error('Failed to save visits');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row my-5">
      <div className="image-container">
        <img src={visitsImage} alt="Visits" />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Visit name :</h2>
            </label>
            <input
              type="text"
              name="visitName"
              value={visits.visitName}
              onChange={handleInputChange}
              placeholder="Visit Name..."
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
              placeholder="Visit Price..."
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
              placeholder="Visit Address..."
            />
          </div>
          <button className="font-inder bg-blue-400 py-2 px-6" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 px-4">
        {savedVisits && (
          <div className='text-left'>
            <p><span className='font-inder text-palette-dark-color-5'>Visit Name: </span>{savedVisits.visitName}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Visit Price: </span>{savedVisits.visitPrice}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Visit Address: </span>{savedVisits.visitAddress}</p>
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

export default Visits;

