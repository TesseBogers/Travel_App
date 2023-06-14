import React, { useState } from 'react';
import TranspImage from "../assets/images/avion-aerien.png"

const Transportation = () => {
  const [transportation, setTransportation] = useState({
    transportationType: '',
    transportationPrice: 0,
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
        transportationPrice: 0,
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
    <div className="flex">
      <div className='w-1/4'>
        <img src={TranspImage} alt="Transportation" className='logo'  />
      </div>
      <div className="w-1/2 mx-2">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Transportation Type :</label>
          <input
          type="text"
          name="transportationType"
          value={transportation.transportationType}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Transportation Price:</label>
          <input
          type="number"
          name="transportationPrice"
          value={transportation.transportationPrice}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Transportation Departure:</label>
          <input
          type="text"
          name="transportationDeparture"
          value={transportation.transportationDeparture}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Transportation Arrival:</label>
          <input
          type="text"
          name="transportationArrival"
          value={transportation.transportationArrival}
          onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      </div>

      <div className='w-1/4'>
      {savedTransportation && (
        <div>
          <p>Transportation Type : {savedTransportation.transportationpType}</p>
          <p>Transportation Price : {savedTransportation.transportationPrice}</p>
          <p>Transportation Departure : {savedTransportation.transportationDeparture}</p>
          <p>Transportation Arrival : {savedTransportation.transportationArrival}</p>
        </div>
      )}
      </div>
    </div>
  );
};

  export default Transportation;