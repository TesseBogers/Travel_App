import React, { useState } from 'react';
import FoodImage from '../assets/images/restaurant.png';

const Food = () => {
  const [food, setFood] = useState({
    foodName: '',
    foodPrice: '',
    foodAddress: '',
  });

  const [savedFood, setSavedFood] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFood((prevFood) => ({ ...prevFood, [name]: value }));
  };

  const API_BASE_URL = 'http://localhost:4000/api/food';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(food),
      });

      if (response.ok) {
        const savedFood = await response.json();
        setSavedFood(savedFood);
        setFood({
          foodName: '',
          foodPrice: '',
          foodAddress: '',
        });
      } else {
        throw new Error('Failed to save food');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row my-5">
      <div className="image-container">
        <img src={FoodImage} alt="Food" />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Food Name :</h2>
            </label>
            <input
              type="text"
              name="foodName"
              value={food.foodName}
              onChange={handleInputChange}
              placeholder="Food Name..."
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Food Price :</h2>
            </label>
            <input
              type="number"
              name="foodPrice"
              value={food.foodPrice}
              onChange={handleInputChange}
              placeholder="Food Price..."
            />
          </div>
          <div>
            <label className='hidden'>
              <h2 className="font-inder text-palette-dark-color-3">Food Address :</h2>
            </label>
            <input
              type="text"
              name="foodAddress"
              value={food.foodAddress}
              onChange={handleInputChange}
              placeholder="Food Address..."
            />
          </div>
          <button className="font-inder bg-blue-400 py-2 px-6" type="submit">
            Save
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4 px-4">
        {savedFood && (
          <div className='text-left'>
            <p><span className='font-inder text-palette-dark-color-5'>Food Name: </span>{savedFood.foodName}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Food Price: </span>{savedFood.foodPrice}</p>
            <p><span className='font-inder text-palette-dark-color-5'>Food Address: </span>{savedFood.foodAddress}</p>
            <button className="font-inder bg-green-300 py-2 px-6 my-5 mx-2" type="submit">
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

export default Food;




