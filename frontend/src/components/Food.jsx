import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the food data or send it to the backend
    setSavedFood(food);
    // Reset the form
    setFood({
      foodName: '',
      foodPrice: 0,
      foodAddress: '',
    });
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <img src={FoodImage} alt="Food" className="logo" />
      </div>
      <div className="w-1/2 mx-2">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Food Name:</label>
            <input
              type="text"
              name="foodName"
              value={food.foodName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Food Price:</label>
            <input
              type="number"
              name="foodPrice"
              value={food.foodPrice}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Food Address:</label>
            <input
              type="text"
              name="foodAddress"
              value={food.foodAddress}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
      <div className="w-1/4">
        {savedFood && (
          <div>
            <h2>Saved Food Data:</h2>
            <p>Food Name: {savedFood.foodName}</p>
            <p>Food Price: {savedFood.foodPrice}</p>
            <p>Food Address: {savedFood.foodAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;


