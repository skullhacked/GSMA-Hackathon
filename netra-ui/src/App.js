import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// 🔽 MAKE SURE YOUR TOKEN IS STILL HERE 🔽
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lyaXJhanNpbmdoIiwiYSI6ImNtZzJrNWdwMDB2OXQya3IzdHdnMXl0MW8ifQ.UU7S6T_df1WiqQI3JnmcVA';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.2295);
  const [lat, setLat] = useState(28.6129);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // This code runs after the map has finished loading
    map.current.on('load', () => {
      // Fetch data from your backend server
      fetch('http://localhost:3001/api/trapped-individuals')
        .then(res => res.json())
        .then(data => {
          // Loop through each "trapped individual" from your data.json
          data.forEach(person => {
            // Create a red marker for each person
            new mapboxgl.Marker({ color: 'red' })
              .setLngLat([person.lng, person.lat]) // Set position using lng and lat
              .addTo(map.current); // Add the marker to the map
          });
        })
        .catch(err => console.error("Error fetching data: ", err));
    });
  });

  return (
    <div>
      <div ref={mapContainer} style={{ height: '100vh' }} />
    </div>
  );
}

export default App;