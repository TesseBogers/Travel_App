import React from "react";
import VisitsImage from "../assets/images/holstentor.png"

class Visits extends React.Component {
    render() {
      return (
        <div className="visits flex flex-row">
          <img src={VisitsImage} alt="Visits" className="logo" />
        <input type="text" placeholder="Add visits data" className="data-input" />
        </div>
      );
    }
  }

export default Visits;