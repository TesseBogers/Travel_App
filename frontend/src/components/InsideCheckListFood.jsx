import React from 'react';

export default function InsideCheckListFood() {
    const foodList = ['Bakery', 'Cafe', 'Fast-food', 'Restaurant', 'Supermarkets'];

    return (
        <>
            <h2 className="titleCheckList">Try these out:</h2>
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
            <button className="searchButton"> Search</button>

        </>
    );
}