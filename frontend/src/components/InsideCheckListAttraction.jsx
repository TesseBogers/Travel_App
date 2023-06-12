import React, { useState, useEffect } from 'react';

export default function InsideCheckListAttraction({ position }) {
    let searchRadius = 500;
    const foodList = [
        { item: 'Aquaria', string: 'String for Aquaria' },
        { item: 'Archaeological sites', string: 'String for Archaeological sites' },
        { item: 'Artwork', string: 'String for Artwork' },
        { item: 'Botanical garden', string: 'String for Botanical garden' },
        { item: 'Gallery', string: 'String for Gallery' },
        { item: 'Historical sites', string: 'String for Historical sites' },
        { item: 'Library', string: 'String for Library' },
        { item: 'Memorials', string: 'String for Memorials' },
        { item: 'Museums', string: 'String for Museums' },
        { item: 'Theme park', string: 'String for Theme park' },
        { item: 'Viewpoints', string: 'String for Viewpoints' },
        { item: 'Zoo', string: 'String for Zoo' }
    ];

    const [selectedStrings, setSelectedStrings] = useState([]);

    const handleCheckboxChange = (string) => {
        if (selectedStrings.includes(string)) {
            setSelectedStrings(selectedStrings.filter((selectedString) => selectedString !== string));
        } else {
            setSelectedStrings([...selectedStrings, string]);
        }
    };

    useEffect(() => {
        console.log(selectedStrings);
    }, [selectedStrings]);

    return (
        <>
            <button className="searchButton">Search</button>
            <h2 className="titleCheckList">Recommendations:</h2>
            <ul className="checklist">
                {foodList.map((item, index) => (
                    <li key={index} className="list-item">
                        <label className="label">
                            <a href="#" onClick={() => handleCheckboxChange(item.string)}>{item.item}</a>
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={selectedStrings.includes(item.string)}
                                onChange={() => handleCheckboxChange(item.string)}
                            />
                        </label>
                    </li>
                ))}
            </ul>

        </>
    );
}