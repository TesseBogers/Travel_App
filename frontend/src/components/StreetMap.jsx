import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L, { icon, marker } from "leaflet";
import "leaflet/dist/leaflet.css";

const StreetMap = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [attractions, setAttractions] = useState([]);
    const APIKEY = "u9DQedHGJDwSKkJOZqAt";
    const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
    const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";
    const position = [51.505, -0.09];

    const getIconUrl = (attraction) => {
        let iconUrl;
        switch (attraction.category) {
            case "museum":
                iconUrl = "./assets/.png/museumIcon.png";
                break;
            case "artwork":
                iconUrl = "./assets/.png/artworkIcon.png";
                break;
            case "viewpoint":
                iconUrl = "./assets/.png/viewpointIcon.png";
                break;
            case "hotel":
                iconUrl = "./assets/.png/hotelIcon.png";
                break;
            case "hostel":
                iconUrl = "./assets/.png/hostelIcon.png";
                break;
            case "camp_site":
                iconUrl = "./assets/.png/campsiteIcon.png";
                break;
            case "theme_park":
                iconUrl = "./assets/.png/themeParkIcon.png";
                break;
            case "zoo":
                iconUrl = "./assets/.png/zooIcon.png";
                break;
            case "aquarium":
                iconUrl = "./assets/.png/aquariumIcon.png";
                break;
            case "gallery":
                iconUrl = "./assets/.png/galleryIcon.png";
                break;
            case "memorial":
                iconUrl = "./assets/.png/memorialIcon.png";
                break;
            case "archaeological_site":
                iconUrl = "./assets/.png/archaeologicalSiteIcon.png";
                break;
            case "historic_site":
                iconUrl = "./assets/.png/historicSiteIcon.png";
                break;
            case "observatory":
                iconUrl = "./assets/.png/observatoryIcon.png";
                break;
            case "botanical_garden":
                iconUrl = "./assets/.png/botanicalGardenIcon.png";
                break;
            case "restaurant":
                iconUrl = "./assets/.png/restaurantIcon.png";
                break;
            case "cafe":
                iconUrl = "./assets/.png/cafeIcon.png";
                break;
            case "bar":
                iconUrl = "./assets/.png/barIcon.png";
                break;
            case "pub":
                iconUrl = "./assets/.png/pubIcon.png";
                break;
            case "fast_food":
                iconUrl = "./assets/.png/fastFoodIcon.png";
                break;
            case "bakery":
                iconUrl = "./assets/.png/bakeryIcon.png";
                break;
            case "pharmacy":
                iconUrl = "./assets/.png/pharmacyIcon.png";
                break;
            case "hospital":
                iconUrl = "./assets/.png/hospitalIcon.png";
                break;
            case "school":
                iconUrl = "./assets/.png/schoolIcon.png";
                break;
            case "university":
                iconUrl = "./assets/.png/universityIcon.png";
                break;
            case "library":
                iconUrl = "./assets/.png/libraryIcon.png";
                break;
            case "bank":
                iconUrl = "./assets/.png/bankIcon.png";
                break;
            case "atm":
                iconUrl = "./assets/.png/atmIcon.png";
                break;
            case "fuel":
                iconUrl = "./assets/.png/fuelIcon.png";
                break;
            default:
                iconUrl = null;
                break;
        }
        const icon = L.icon({
            iconSize: [38, 38],
            iconUrl: iconUrl,
        });
        console.log(iconUrl);
        return icon;
    };

    const ResetCenterView = ({ selectPosition }) => {
        const map = useMap();

        useEffect(() => {
            if (selectPosition) {
                map.setView(
                    L.latLng(selectPosition?.lat, selectPosition?.lon),
                    map.getZoom(),
                    {
                        animate: false,
                    }
                );
            }
        }, [selectPosition, map]);

        return null;
    };

    const Maps = ({ selectPosition, attractionsData }) => {
        const locationSelection = [selectPosition?.lat, selectPosition?.lon];

        return (
            <MapContainer
                center={position}
                zoom={16}
                style={{ width: "60vw", height: "40vh"}}
                whenCreated={(map) => {
                    if (selectPosition) {
                        map.setView(
                            L.latLng(selectPosition?.lat, selectPosition?.lon),
                            map.getZoom(),
                            {
                                animate: false,
                            }
                        );
                    }
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=${APIKEY}`}
                />
                {selectPosition && (
                    <Marker position={locationSelection}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )}
                {attractionsData.map((attraction) => (
                    <Marker
                        key={attraction.id}
                        position={[attraction.lat, attraction.lon]}
                        icon={L.icon({
                            iconSize: [38, 38],
                            iconUrl: ("../icon/markerIcon.png"),
                        })}
                    >
                        <Popup>
                            <strong>{attraction.name}</strong><br />
                            {attraction.description}<br />
                            {attraction.category}
                        </Popup>
                    </Marker>
                ))}
                <ResetCenterView selectPosition={selectPosition} />
            </MapContainer>
        );
    };

    const SearchBox = ({ setSelectPosition }) => {
        const handleSearchSubmit = async (event) => {
            event.preventDefault();
            const searchText = event.target.search.value;
            await searchPlace(searchText);
        };

        const searchPlace = async (searchText) => {
            const url = `${NOMINATIM_BASE_URL}q=${searchText}&format=json&limit=1`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const place = data[0];
                    setSelectPosition({
                        lat: parseFloat(place.lat),
                        lon: parseFloat(place.lon),
                    });
                }
            } catch (error) {
                console.log("Error searching place:", error);
            }
        };

        return (
            <div>
                <form onSubmit={handleSearchSubmit}>
                    <input className="fillInCity" type="text" name="search" placeholder="Search for a place" />
                    <button className="submitCity" type="submit">Search</button>
                </form>
            </div>
        );
    };


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
            console.log(data);
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
        <div style={{ display: "flex", height: "auto"}}>
            <div  style={{ flex: 1}}>
                <SearchBox   setSelectPosition={setSelectPosition} />
                <Maps selectPosition={selectPosition} attractionsData={attractions} />
            </div>
        </div>
    );
};

export default StreetMap;