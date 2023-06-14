import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the housing data or send it to the backend
    setHousing({
      housingName: '',
      housingPrice: 0,
      housingAddress: '',
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="housing flex flex-row">
          <img src={housingImage} alt="Housing" className="logo" />
      </div>
        <div>
          <label>Housing Name:</label>
          <input
          type="text"
          name="housingName"
          value={housing.housingName}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Housing Price:</label>
          <input
          type="number"
          name="housingPrice"
          value={housing.housingPrice}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Housing Address:</label>
          <input
          type="text"
          name="housingAddress"
          value={housing.housingAddress}
          onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      {savedHousing && (
        <div>
          <h2>{savedHousing.housingName}</h2>
          <p>Housing Name : {savedHousing.housingName}</p>
          <p>Housing Price : {savedHousing.housingPrice}</p>
          <p>Housing Address : {savedHousing.housingAddress}</p>
        </div>
      )}
    </div>
  );
};


export default Housing;