import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane} from "@fortawesome/free-solid-svg-icons"

const Transportation = () => {
  const [transportation, setTransportation] = useState({
    transportationType: '',
    transportationPrice: '',
    transportationDeparture: '',
    transportationArrival: '',
  });

  const [savedTransportation, setSavedTransportation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportation((prevTransportation) => ({ ...prevTransportation, [name]: value }));
  };

  const API_BASE_URL = 'http://localhost:4000/api/transportation';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transportation),
      });

      if (response.ok) {
        const savedTransportation = await response.json();
        setSavedTransportation(savedTransportation);
        setTransportation({
          transportationType: '',
          transportationPrice: '',
          transportationDeparture: '',
          transportationArrival: '',
        });
      } else {
        throw new Error('Failed to save transportation');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row my-5">
      <div className="image-container">
      <FontAwesomeIcon icon={faPlane} size='3x' style={{ color: '#247BA0' }}/>
      <h3 className='py-2 text-palette-dark-color-5 text-xl'>Transport</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Transportation Type :</h2>
            </label>
            <input
              type="text"
              name="transportationType"
              value={transportation.transportationType}
              onChange={handleInputChange}
              placeholder="Write type..."
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Transportation Price :</h2>
            </label>
            <input
              type="number"
              name="transportationPrice"
              value={transportation.transportationPrice}
              onChange={handleInputChange}
              placeholder="Write price..."
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Transportation Departure :</h2>
            </label>
            <input
              type="text"
              name="transportationDeparture"
              value={transportation.transportationDeparture}
              onChange={handleInputChange}
              placeholder="Write departure place..."
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Transportation Arrival :</h2>
            </label>
            <input
              type="text"
              name="transportationArrival"
              value={transportation.transportationArrival}
              onChange={handleInputChange}
              placeholder="Write arrival place..."
            />
          </div>
          <button className="font-inder text-palette-light-color-1 bg-brand-blue-0-shades py-2 px-6" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 px-4">
        {savedTransportation && (
          <div className='text-left'>
            <p><span className='font-inder text-palette-dark-color-5'>Type: </span>{savedTransportation.transportationType}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Price: </span>{savedTransportation.transportationPrice}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Departure: </span>{savedTransportation.transportationDeparture}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Arrival: </span>{savedTransportation.transportationArrival}</p>
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

export default Transportation;

