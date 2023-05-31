import React from 'react';

export default function InsideCheckListAttraction() {
    const foodList = ['Place 1', 'Place 2', 'Place 3'];

    return (
        <ul className="checklist">
            {foodList.map((item, index) => (
                <li key={index}>
                    {item}
                    <input type="checkbox" className="checkbox" />
                </li>
            ))}
        </ul>
    );
}