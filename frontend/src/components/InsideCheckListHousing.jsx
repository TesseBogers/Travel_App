import React from 'react';

export default function InsideCheckListHousing() {
    const foodList = ['Hotel', 'Hostels', 'Campsites'];

    return (
        <>
        <button className="searchButton"> Search</button>

            <h2 className="titleCheckList">Feel at home:</h2>
        <ul className="checklist">
            {foodList.map((item, index) => (
                <li key={index} className="list-item">
                    <label className="label">
                        {item}
                        <input type="checkbox" className="checkbox" />
                    </label>
                </li>
            ))}
        </ul>
        </>
    );
}