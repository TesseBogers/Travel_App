import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent.jsx";
import ResetCenterView from "./ResetCenterView.jsx";
import SearchBox from "./SearchBox";

const StreetMap = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [attractions, setAttractions] = useState([]);
    const APIKEY = "u9DQedHGJDwSKkJOZqAt";
    const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
    const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";
    const position = [51.505, -0.09];

    const fetchAttractions = async (position) => {
        let searchRadius = 500;
        const query = `[out:json];
      (
          node["tourism"](around:${searchRadius}, ${position.lat}, ${position.lon});
          node["amenity"](around:${searchRadius}, ${position.lat}, ${position.lon});
      );
      out body;
      >;
      out skel qt;`;

        const requestOptions = {
            method: "POST",
            body: query,
        };

        try {
            const response = await fetch(OVERPASS_API_URL, requestOptions);
            const data = await response.json();
            const attractionsData = data.elements.map((element) => ({
                id: element.id,
                name: element.tags.name,
                description: element.tags.description,
                lat: element.lat,
                lon: element.lon,
                category: element.tags.amenity,
            }));
            setAttractions(attractionsData);
        } catch (error) {
            console.log("Error fetching attractions:", error);
        }
    };

    useEffect(() => {
        if (selectPosition) {
            fetchAttractions(selectPosition);
        }
    }, [selectPosition]);

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ flex: 1 }}>
                <SearchBox setSelectPosition={setSelectPosition} />
                <MapComponent
                    position={position}
                    selectPosition={selectPosition}
                    attractionsData={attractions}
                />
            </div>
        </div>
    );
};

export default StreetMap;
