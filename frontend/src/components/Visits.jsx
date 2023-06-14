import React, { useState } from 'react';
import visitsImage from "../assets/images/holstentor.png"

const Visits = () => {
  const [visits, setVisits] = useState({
    visitsName: '',
    visitsPrice: 0,
    visitsAddress: '',
  });

  const [savedVisits, setSavedVisits] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisits((prevVisits) => ({ ...prevVisits, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the visits data or send it to the backend
    setVisits({
      visitsName: '',
      visitsPrice: 0,
      visitsAddress: '',
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="visits flex flex-row">
          <img src={visitsImage} alt="Visits" className="logo" />
      </div>
        <div>
          <label>Visits Name:</label>
          <input
          type="text"
          name="visitsName"
          value={visits.visitsName}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Visits Price:</label>
          <input
          type="number"
          name="visitsPrice"
          value={visits.visitsPrice}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Visits Address:</label>
          <input
          type="text"
          name="visitsAdress"
          value={visits.visitsAddress}
          onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      {savedVisits && (
        <div>
          <h3>{savedVisits.visitsName}</h3>
          <p>Housing Name : {savedVisits.visitsName}</p>
          <p>Housing Price : {savedVisits.visitsPrice}</p>
          <p>Housing Address : {savedVisits.visitsAddress}</p>
        </div>
      )}
      </div>
  );
};


export default Visits;
