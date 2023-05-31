import React from 'react';

export default function InsideCheckListFood() {
    const foodList = ['Pizza', 'Sushi', 'Kebab'];

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