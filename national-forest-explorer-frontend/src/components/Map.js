import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96.9, 37.8],
      zoom: 4,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    new mapboxgl.Marker()
      .setLngLat([-122.4194, 37.7749]) 
      .setPopup(new mapboxgl.Popup().setText('Example National Park')) 
      .addTo(map);

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ height: '600px', width: '100%' }} />;
};

export default Map;
