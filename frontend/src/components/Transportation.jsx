import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const Transportation = () => {
  const [transportation, setTransportation] = useState({
    transportationType: '',
    transportationPrice: '',
    transportationDeparture: '',
    transportationArrival: '',
  });

  const [editedTransportation, setEditedTransportation] = useState({
    transportationType: '',
    transportationPrice: '',
    transportationDeparture: '',
    transportationArrival: '',
  });

  const [savedTransportation, setSavedTransportation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTransportation((prevEditedTransportation) => ({ ...prevEditedTransportation, [name]: value }));
  };

  const API_BASE_URL = 'http://localhost:4000/api/transportation';

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Save Button Clicked : ", e);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTransportation),
      });
        console.log(response);

      if (response.ok) {
        const savedTransportation = await response.json();
        console.log(savedTransportation);
        setSavedTransportation(savedTransportation);
        setIsEditing(true);
      } else {
        throw new Error('Failed to save transportation');
      }
    } catch (error) {
      console.error(error);
      console.log(error)
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${savedTransportation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTransportation),
      });

      if (response.ok) {
        const updatedTransportation = await response.json();
        setSavedTransportation(updatedTransportation);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update transportation');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!savedTransportation) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${savedTransportation.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSavedTransportation(null);
        setTransportation({
          transportationType: '',
          transportationPrice: '',
          transportationDeparture: '',
          transportationArrival: '',
        });
        setEditedTransportation({
          transportationType: '',
          transportationPrice: '',
          transportationDeparture: '',
          transportationArrival: '',
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to delete transportation');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (savedTransportation) {
      setTransportation({ ...savedTransportation });
    }
  }, [savedTransportation]);

  return (
      <div className="flex flex-row my-5">
        <div className="image-container">
          <FontAwesomeIcon icon={faPlane} size="4x" style={{ color: '#247BA0' }} />
          <h2 className="font-roboto text-brand-blue-30-shades font-black py-3">Transport</h2>
        </div>
        <div>
          {!savedTransportation && (
              <form onSubmit={handleSave} className="flex flex-col gap-4 px-4">
                <div>
                  <label className="hidden">
                    <h2 className="font-inder text-palette-dark-color-3">Transportation Type:</h2>
                  </label>
                  <input
                      type="text"
                      name="transportationType"
                      value={editedTransportation.transportationType}
                      onChange={handleInputChange}
                      placeholder="Write type..."
                  />
                </div>
                <div>
                  <label className="hidden">
                    <h2 className="font-inder text-palette-dark-color-3">Transportation Price:</h2>
                  </label>
                  <input
                      type="number"
                      name="transportationPrice"
                      value={editedTransportation.transportationPrice}
                      onChange={handleInputChange}
                      placeholder="Write price..."
                  />
                </div>
                <div>
                  <label className="hidden">
                    <h2 className="font-inder text-palette-dark-color-3">Transportation Departure:</h2>
                  </label>
                  <input
                      type="text"
                      name="transportationDeparture"
                      value={editedTransportation.transportationDeparture}
                      onChange={handleInputChange}
                      placeholder="Write departure place..."
                  />
                </div>
                <div>
                  <label className="hidden">
                    <h2 className="font-inder text-palette-dark-color-3">Transportation Arrival:</h2>
                  </label>
                  <input
                      type="text"
                      name="transportationArrival"
                      value={editedTransportation.transportationArrival}
                      onChange={handleInputChange}
                      placeholder="Write arrival place..."
                  />
                </div>
                <button className="font-inder bg-brand-blue-0-shades py-2 px-6 text-palette-light-color-1" type="submit">
                  Save
                </button>
              </form>
          )}
        </div>

        <div className="flex flex-col gap-4 px-4">
          {savedTransportation && (
              <div className="text-left">
                <p>
                  <span className="font-inder text-palette-dark-color-5">Type: </span>
                  {isEditing ? (
                      <input
                          type="text"
                          name="transportationType"
                          value={editedTransportation.transportationType}
                          onChange={handleInputChange}
                      />
                  ) : (
                      savedTransportation.transportationType
                  )}
                </p>
                <p>
                  <span className="font-inder text-palette-dark-color-5">Price: </span>
                  {isEditing ? (
                      <input
                          type="number"
                          name="transportationPrice"
                          value={editedTransportation.transportationPrice}
                          onChange={handleInputChange}
                      />
                  ) : (
                      savedTransportation.transportationPrice
                  )}
                </p>
                <p>
                  <span className="font-inder text-palette-dark-color-5">Departure: </span>
                  {isEditing ? (
                      <input
                          type="text"
                          name="transportationDeparture"
                          value={editedTransportation.transportationDeparture}
                          onChange={handleInputChange}
                      />
                  ) : (
                      savedTransportation.transportationDeparture
                  )}
                </p>
                <p>
                  <span className="font-inder text-palette-dark-color-5">Arrival: </span>
                  {isEditing ? (
                      <input
                          type="text"
                          name="transportationArrival"
                          value={editedTransportation.transportationArrival}
                          onChange={handleInputChange}
                      />
                  ) : (
                      savedTransportation.transportationArrival
                  )}
                </p>
                {isEditing ? (
                    <button className="font-inder bg-green-300 py-2 px-6 my-5 mx-2" onClick={handleUpdate}>
                      Update
                    </button>
                ) : (
                    <button className="font-inder bg-orange-300 py-2 px-6 my-5 mx-2" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                )}
                <button className="font-inder bg-red-300 py-2 px-6 my-5 mx-2" type="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default Transportation;
