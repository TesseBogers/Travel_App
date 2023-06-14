import React, { useState } from 'react';
import TranspImage from "../assets/images/avion-aerien.png"

const Transportation = () => {
  const [transportation, setTransportation] = useState({
    transpType: '',
    transpPrice: 0,
    transpDepart: '',
    transpArriv: '',
  });

  const [savedTransportation, setSavedTransportation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportation((prevTransportation) => ({ ...prevTransportation, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the housing data or send it to the backend
    setTransportation({
      transpType: '',
      transpPrice: 0,
      transpDepart: '',
      transpArriv: '',
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="transportation flex flex-row">
          <img src={TranspImage} alt="Transportation" className="logo" />
      </div>
        <div>
          <label>Transportation Type :</label>
          <input
          type="text"
          name="transpType"
          value={transportation.transpType}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Transportation Price:</label>
          <input
          type="number"
          name="TranspPrice"
          value={transportation.transpPrice}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Transportation Departure:</label>
          <input
          type="text"
          name="transpDepart"
          value={transportation.transpDepart}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Transportation Arrival:</label>
          <input
          type="text"
          name="transpArriv"
          value={transportation.transpArriv}
          onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      {savedTransportation && (
        <div>
          <h2>Saved Transportation Data : </h2>
          <p>Transportation Type : {savedTransportation.transpType}</p>
          <p>Transportation Price : {savedTransportation.transpPrice}</p>
          <p>Transportation Departure : {savedTransportation.transpDepart}</p>
          <p>Transportation Arrival : {savedTransportation.transpArriv}</p>
        </div>
      )}
    </div>
  );
};

  export default Transportation;