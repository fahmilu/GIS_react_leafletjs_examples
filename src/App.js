import React from "react";
import Map from "./Map/Map";
import "leaflet/dist/leaflet.css";
import "./css/app.css";
import "antd/dist/reset.css"
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

function App() {
  return (
        <Map/>
  );
}

export default App;
