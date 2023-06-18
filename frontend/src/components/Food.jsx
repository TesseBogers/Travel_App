import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const Food = () => {
  const [food, setFood] = useState({
    foodName: '',
    foodPrice: '',
    foodAddress: '',
  });

  const [editedFood, setEditedFood] = useState({
    foodName: '',
    foodPrice: '',
    foodAddress: '',
  });

  const [savedFood, setSavedFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFood((prevEditedFood) => ({ ...prevEditedFood, [name]: value }));
  };

  const API_BASE_URL = 'http://localhost:4000/api/food';

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Save Button Clicked : ", e);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFood),
      });
      console.log(response);

      if (response.ok) {
        const savedFood = await response.json();
        console.log(savedFood);
        setSavedFood(savedFood);
        setIsEditing(true);
      } else {
        throw new Error('Failed to save food');
      }
    } catch (error) {
      console.log(error)
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${savedFood.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFood),
      });

      if (response.ok) {
        const updatedFood = await response.json();
        setSavedFood(updatedFood);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update food');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
      if (!savedFood) {
          return;
      }

    try {
      const response = await fetch(`${API_BASE_URL}/${savedFood.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSavedFood(null);
        setFood({
          foodName: '',
          foodPrice: '',
          foodAddress: '',
        });
        setEditedFood({
          foodName: '',
          foodPrice: '',
          foodAddress: '',
        });
        setIsEditing(false);
      } else {
        throw new Error('Failed to delete food');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (savedFood) {
      setFood({ ...savedFood });
    }
  }, [savedFood]);

  return (
      <div className="flex flex-row my-5">
        <div className="image-container">
          <FontAwesomeIcon icon={faUtensils} size="4x" style={{ color: '#247BA0' }} />
          <h2 className="font-roboto text-brand-blue-30-shades font-black py-3">Food</h2>
        </div>
        <div>
          {!savedFood && (
              <form onSubmit={handleSave} className="flex flex-col gap-4 px-4">
                <div>
                  <label className="hidden" >
                    <h2 className="font-inder text-palette-dark-color-3">Food Name :</h2>
                  </label>
                  <input
                      type="text"
                      name="foodName"
                      value={editedFood.foodName}
                      onChange={handleInputChange}
                      placeholder="Write name..."
                  />
                </div>
                <div>
                  <label className="hidden">
                    <h2 className="font-inder text-palette-dark-color-3">Food Price :</h2>
                  </label>
                  <input
                      type="number"
                      name="foodPrice"
                      value={editedFood.foodPrice}
                      onChange={handleInputChange}
                      placeholder="Write price..."
                  />
                </div>
                <div>
                  <label className="hidden">
                    <h2 className="font-inder text-palette-dark-color-3">Food Address :</h2>
                  </label>
                  <input
                      type="text"
                      name="foodAddress"
                      value={editedFood.foodAddress}
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
          {savedFood && (
              <div className="text-left">
                <p>
                  <span className="font-inder text-palette-dark-color-5">Name: </span>
                  {isEditing ? (
                      <input type="text" name="foodName" value={editedFood.foodName} onChange={handleInputChange} />
                  ) : (
                      savedFood.foodName
                  )}
                </p>
                <p>
                  <span className="font-inder text-palette-dark-color-5">Price: </span>
                  {isEditing ? (
                      <input type="number" name="foodPrice" value={editedFood.foodPrice} onChange={handleInputChange} />
                  ) : (
                      savedFood.foodPrice
                  )}
                </p>
                <p>
                  <span className="font-inder text-palette-dark-color-5">Address: </span>
                  {isEditing ? (
                      <input type="text" name="foodAddress" value={editedFood.foodAddress} onChange={handleInputChange} />
                  ) : (
                      savedFood.foodAddress
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

export default Food;






