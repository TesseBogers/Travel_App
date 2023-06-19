import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

const Housing = () => {
  const [housing, setHousing] = useState({
    housingName: '',
    housingPrice: '',
    housingAddress: '',
  });

  const [editedHousing, setEditedHousing] = useState({
    housingName: '',
    housingPrice: '',
    housingAddress: '',
  });

  const [savedHousing, setSavedHousing] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHousing((prevEditedHousing) => ({ ...prevEditedHousing, [name]: value }));
  };

  const API_BASE_URL = 'http://localhost:4000/api/housing';

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Save Button Clicked : ", e);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedHousing),
      });
      console.log(response);

      if (response.ok) {
        const savedHousing = await response.json();
        console.log(savedHousing);
        setSavedHousing(savedHousing);
        setIsEditing(true);
      } else {
        throw new Error('Failed to save housing');
      }
    } catch (error) {
      console.error(error);
      console.log(error)
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${savedHousing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedHousing),
      });

      if (response.ok) {
        const updatedHousing = await response.json();
        setSavedHousing(updatedHousing);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update housing');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!savedHousing) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${savedHousing.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSavedHousing(null);
        setHousing({
          housingName: '',
          housingPrice: '',
          housingAddress: '',
        });
        setEditedHousing({
          housingName: '',
          housingPrice: '',
          housingAddress: '',
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to delete housing');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (savedHousing) {
      setHousing({ ...savedHousing})
    }
  }, [savedHousing]);

  return (
      <div className="flex flex-row my-5">
        <div className="image-container">
          <FontAwesomeIcon icon={faBed} size="4x" style={{ color: '#247BA0' }}/>
          <h2 className="font-roboto text-brand-blue-30-shades font-black py-3">Housing</h2>
        </div>
        <div>
          {!savedHousing && (
              <form onSubmit={handleSave} className="flex flex-col gap-4 px-4">
                <div>
                  <label className='hidden'>
                    <h2 className="font-inder text-palette-dark-color-3">Housing name :</h2>
                  </label>
                  <input
                      type="text"
                      name="housingName"
                      value={editedHousing.housingName}
                      onChange={handleInputChange}
                      placeholder="Write name..."
                  />
                </div>
                <div>
                  <label className='hidden'>
                    <h2 className="font-inder text-palette-dark-color-3">Housing price :</h2>
                  </label>
                  <input
                      type="number"
                      name="housingPrice"
                      value={editedHousing.housingPrice}
                      onChange={handleInputChange}
                      placeholder="Write price..."
                  />
                </div>
                <div>
                  <label className='hidden'>
                    <h2 className="font-inder text-palette-dark-color-3">Housing address :</h2>
                  </label>
                  <input
                      type="text"
                      name="housingAddress"
                      value={editedHousing.housingAddress}
                      onChange={handleInputChange}
                      placeholder="Write address..."
                  />
                </div>
                <button className="font-inder bg-brand-blue-0-shades py-2 px-6 text-palette-light-color-1" type="submit">
                  Save
                </button>
              </form>
          )}
        </div>

        <div className="flex flex-col gap-4 px-4">
          {savedHousing && (
              <div className='text-left'>
                <p>
                  <span className='font-inder text-palette-dark-color-5'>Name : </span>
                  {isEditing ? (
                      <input type="text" name="housingName" value={editedHousing.housingName} onChange={handleInputChange} />
                  ) : (
                      savedHousing.housingName
                  )}
                </p>
                <p>
                  <span className='font-inder text-palette-dark-color-5'>Price: </span>
                  {isEditing ? (
                      <input type="number" name="housingPrice" value={editedHousing.housingPrice} onChange={handleInputChange} />
                  ) : (
                      savedHousing.housingPrice
                  )}
                </p>
                <p>
                  <span className='font-inder text-palette-dark-color-5'>Address: </span>
                  {isEditing ? (
                      <input type="text" name="housingAddress" value={editedHousing.housingAddress} onChange={handleInputChange} />
                  ) : (
                      savedHousing.housingAddress
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

export default Housing;

