import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLandmark} from "@fortawesome/free-solid-svg-icons"

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
      <FontAwesomeIcon icon={faLandmark} size='3x' style={{ color: '#247BA0' }}/>
      <h3 className='py-2 text-palette-dark-color-5 text-xl'>Visits</h3>
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
              placeholder="Write name..."
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
              placeholder="Write price..."
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
              placeholder="Write address..."
            />
          </div>
          <button className="font-inder text-palette-light-color-1 bg-brand-blue-0-shades py-2 px-6" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 px-4">
        {savedVisits && (
          <div className='text-left'>
            <p><span className='font-inder text-palette-dark-color-5'>Name: </span>{savedVisits.visitName}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Price: </span>{savedVisits.visitPrice}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Address: </span>{savedVisits.visitAddress}</p>
            <button className="font-inder bg-orange-300 py-2 px-6 my-5 mx-2" type="submit">
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

