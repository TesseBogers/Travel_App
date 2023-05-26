import React, { useState } from 'react'
// import Pictures from './Pictures';


export default function ChooseButton() {

  const optionButtons = [
    'Food',
    'Housing',
    'Attractions'
  ]

  const handleClick = (event) => console.log(event)

  return(
<>
    <h1>What would you like to do?</h1>
    <ul className="list-group">

      {optionButtons.map((optionButtons, index) => (
      <button 
        key={optionButtons} 
        style={{margin:'10px', height:'100px', width:'100px'}}
        onClick={handleClick}
      >{optionButtons}</button>
      ))}

    </ul>
</>
)
}
