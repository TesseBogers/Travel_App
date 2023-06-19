import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

const Visits = () => {
  const [visits, setVisits] = useState({
    visitName: '',
    visitPrice: '',
    visitAddress: '',
  });

  const [editedVisits, setEditedVisits] = useState({
    visitName: '',
    visitPrice: '',
    visitAddress: '',
  });

  const [savedVisits, setSavedVisits] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVisits((prevEditedVisits) => ({ ...prevEditedVisits, [name]: value }));
  };

  const API_BASE_URL = 'http://localhost:4000/api/visits';

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Save Button Clicked : ", e);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedVisits),
      });
      console.log(response);

      if (response.ok) {
        const savedVisits = await response.json();
        console.log(savedVisits);
        setSavedVisits(savedVisits);
        setIsEditing(true);
      } else {
        throw new Error('Failed to save visits');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${savedVisits.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedVisits),
      });

      if (response.ok) {
        const updatedVisits = await response.json();
        setSavedVisits(updatedVisits);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update visits');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!savedVisits) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${savedVisits.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSavedVisits(null);
        setVisits({
          visitName: '',
          visitPrice: '',
          visitAddress: '',
        });
        setEditedVisits({
          visitName: '',
          visitPrice: '',
          visitAddress: '',
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to delete visits');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (savedVisits) {
      setVisits({ ...savedVisits });
    }
  }, [savedVisits]);

  return (
      <div className="flex flex-row my-5">
        <div className="image-container">
          <FontAwesomeIcon icon={faLandmark} size="4x" style={{ color: '#247BA0' }}/>
          <h2 className="font-roboto text-brand-blue-30-shades font-black py-3">Visits</h2>
        </div>
        <div>
          {!savedVisits && (
              <form onSubmit={handleSave} className="flex flex-col gap-4 px-4">
                <div>
                  <label className='hidden'>
                    <h2 className="font-inder text-palette-dark-color-3">Visit name :</h2>
                  </label>
                  <input
                      type="text"
                      name="visitName"
                      value={editedVisits.visitName}
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
                      value={editedVisits.visitPrice}
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
                      value={editedVisits.visitAddress}
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
          {savedVisits && (
              <div className='text-left'>
                <p>
                  <span className='font-inder text-palette-dark-color-5'>Name: </span>
                  {isEditing ? (
                      <input type="text" name="visitName" value={editedVisits.visitName} onChange={handleInputChange} />
                  ) : (
                      savedVisits.visitName
                  )}
                </p>
                <p>
                  <span className='font-inder text-palette-dark-color-5'>Price: </span>
                  {isEditing ? (
                      <input type="number" name="visitPrice" value={editedVisits.visitPrice} onChange={handleInputChange} />
                  ) : (
                      savedVisits.visitPrice
                  )}
                </p>
                <p>
                  <span className='font-inder text-palette-dark-color-5'>Address: </span>
                  {isEditing ? (
                      <input type="text" name="visitAddress" value={editedVisits.visitAddress} onChange={handleInputChange} />
                  ) : (
                      savedVisits.visitAddress
                  )}
                </p>
                {isEditing ? (
                    <button className="font-inder bg-green-300 py-2 px-6 my-5 mx-2" onClick={handleUpdate}>
                      Update
                    </button>
                ) : (
                    <button className="font-inder bg-orange-300 py-2 px-6 my-5 mx-2" onClick={() => setIsEditing(true)} >
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

export default Visits;

