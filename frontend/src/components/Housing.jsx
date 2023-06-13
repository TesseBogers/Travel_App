import React from "react";
import HousingImage from "../assets/images/hotel.png"

class Housing extends React.Component {
    render() {
      return (
        <div className="housing flex flex-row">
          <img src={HousingImage} alt="Housing" className="logo" />
        <input type="text" placeholder="Add housing data" className="data-input" />
        </div>
      );
    }
  }

export default Housing;