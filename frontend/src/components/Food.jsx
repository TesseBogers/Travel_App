import React from "react";
import FoodImage from "../assets/images/coutellerie.png"

class Food extends React.Component {
    render() {
      return (
        <div className="food flex flex-row">
          <img src={FoodImage} alt="Food" className="logo" />
        <input type="text" placeholder="Add food data" className="data-input" />
        </div>
      );
    }
  }

export default Food;