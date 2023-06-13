import React from "react";
import TranspImage from "../assets/images/avion-aerien.png"

class Transportation extends React.Component {
  render() {
    return (
      <div className="transportation flex flex-row">
        <img src={TranspImage} alt="Transportation" className="logo" />
        <input type="text" placeholder="Add transportation data" className="data-input" />
      </div>
    );
  }
}

export default Transportation;