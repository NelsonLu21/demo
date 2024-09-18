import mapboxgl from "mapbox-gl";
import React, { useState, useEffect, useRef } from "react";
import "./Searchbar.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input, List } from "antd";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmVsc29ubHUiLCJhIjoiY20wdWE2aGk3MDh0YjJucTFubHoxc3RwZyJ9.Nweae-CBDlw5MPZuFmA7YQ";

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState(null);
  const mapContainerRef = useRef(null); // Using ref to ensure only one map container

  // Ref to store the map instance
  const mapRef = useRef(null);

  // Initialize the map
  useEffect(() => {
    if (mapRef.current === null) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current, // container id from ref
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-117.161087, 32.715736], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      mapRef.current = mapInstance; // Store the map instance in ref
    }
  }, []);

  // Fetch suggestions from Mapbox Geocoding API as user types
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${
        mapboxgl.accessToken
      }&autocomplete=true&limit=5&proximity=-117.161087,32.715736`;
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  // Handle address selection
  const handleSuggestionClick = (suggestion) => {
    const coordinates = suggestion.geometry.coordinates;
    setCoords(coordinates);
    setSearchQuery(suggestion.place_name);
    setSuggestions([]); // Clear suggestions after selection

    // Center the map on the selected suggestion
    mapRef.current.flyTo({
      center: coordinates,
      essential: true, // animation support
    });

    new mapboxgl.Marker().setLngLat(coordinates).addTo(mapRef.current);
  };

  return (
    <div>
      <div id="search-bar">
        <Input
          type="text"
          placeholder="Enter an address"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <List className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <List.Item
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.place_name}
              </List.Item>
            ))}
          </List>
        )}
      </div>
      {/* Use ref for the map container */}
      <div id="map" ref={mapContainerRef}></div>
    </div>
  );
}

export default Searchbar;
