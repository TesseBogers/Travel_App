import { React, useState, useEffect } from 'react';
import FoodImage from "../assets/images/coutellerie.png"

const Food = () => {
  const [food, setFood] = useState({
    foodName: '',
    foodPrice: 0,
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
          foodPrice: 0,
          foodAddress: '',
        });
        // Save the data in local storage
        localStorage.setItem('savedFood', JSON.stringify(savedFood));
      } else {
        throw new Error('Failed to save food');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Retrieve the data from local storage on component mount
    const savedFoodData = localStorage.getItem('savedFood');
    if (savedFoodData) {
      setSavedFood(JSON.parse(savedFoodData));
    }
  }, []);

  return (
    <div className="flex">
      <div className="w-1/4">
        <img src={FoodImage} alt="Food" className="logo" />
      </div>
      <div className="w-1/2 mx-2">
        <form onSubmit={handleSubmit}>
          <div>
            <label><h2 className='font-inder text-palette-dark-color-3'>Food Name :</h2></label>
            <input
              type="text"
              name="foodName"
              value={food.foodName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><h2 className='font-inder text-palette-dark-color-3'>Food Price :</h2></label>
            <input
              type="number"
              name="foodPrice"
              value={food.foodPrice}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label><h2 className='font-inder text-palette-dark-color-3'>Food Address :</h2></label>
            <input
              type="text"
              name="foodAddress"
              value={food.foodAddress}
              onChange={handleInputChange}
            />
          </div>
          <button className='font-inder bg-purple-300' type="submit">Save</button>
        </form>
      </div>
      <div className="w-1/4">
        {savedFood && (
          <div>
            <p>Food Name: {savedFood.foodName}</p>
            <p>Food Price: {savedFood.foodPrice}</p>
            <p>Food Address: {savedFood.foodAddress}</p>
            <button className='font-inder bg-purple-300' type="submit">Edit</button>
            <button className='font-inder bg-purple-300' type="submit">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;



