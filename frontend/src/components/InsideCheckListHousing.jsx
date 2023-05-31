import React from 'react';

export default function InsideCheckListHousing() {
    const foodList = ['Hotel', 'AirBnb', 'booking.com'];

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