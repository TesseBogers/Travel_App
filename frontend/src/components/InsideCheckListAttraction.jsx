import React from 'react';

export default function InsideCheckListAttraction() {
    const foodList = ['Aquaria', 'Archaeological sites', 'Artwork','Botanical garden', 'Gallery', 'Historical sites','Library', 'Memorials', 'Museums', 'Theme park', 'viewpoints', 'Zoo'];

    return (
        <>
            <h2 className="titleCheckList"> Recommendations: </h2>
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