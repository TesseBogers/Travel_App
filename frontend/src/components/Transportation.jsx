import React, { useState, useEffect } from 'react';
import TranspImage from "../assets/images/avion.png";

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
        localStorage.setItem('savedTransportation', JSON.stringify(savedTransportation));
      } else {
        throw new Error('Failed to save transportation');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const savedTransportationData = JSON.parse(localStorage.getItem('savedTransportation'));
    if (savedTransportationData) {
      setSavedTransportation(savedTransportationData);
    }
  }, []);

  return (
    <div className='flex flex-row my-5'>
      <div className='image-container'>
        <img src={TranspImage} alt="Transportation" />
      </div>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4'>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Transportation Type :</h2>
            </label>
            <input
              type="text"
              name="transportationType"
              value={transportation.transportationType}
              onChange={handleInputChange}
              placeholder='Transportation Type...'
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Transportation Price :</h2>
            </label >
            <input
              type="number"
              name="transportationPrice"
              value={transportation.transportationPrice}
              onChange={handleInputChange}
              placeholder='Transportation Price...'
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
              placeholder='Transportation Departure...'
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
              placeholder='Transportation Arrival...'
            />
          </div>
          <button className="font-inder bg-blue-400 py-2 px-6" type="submit text-lg font-bold font-inder">Save</button>
        </form>
      </div>

      <div className='flex flex-col gap-4 px-4'>
        {savedTransportation && (
          <div>
            <p>Transportation Type: {savedTransportation.transportationType}</p>
            <p>Transportation Price: {savedTransportation.transportationPrice}</p>
            <p>Transportation Departure: {savedTransportation.transportationDeparture}</p>
            <p>Transportation Arrival: {savedTransportation.transportationArrival}</p>
            <button className="font-inder bg-green-300 py-2 px-6" type="submit text-lg font-bold font-inder">Edit</button>
            <button className="font-inder bg-red-300 py-2 px-6" type="submit text-lg font-bold font-inder">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transportation;
