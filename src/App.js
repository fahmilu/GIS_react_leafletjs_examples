import React from "react";

import { Navigation } from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from "./login/login";
import { Home } from "./login/home";
import { Logout } from './login/logout';


import Map from "./Map/Map";
import "leaflet/dist/leaflet.css";
import "./css/app.css";
import "antd/dist/reset.css"
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

function App() {
  return (
    <div>
      {/*<BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>;
      {/*<Map />*/}
      <Home />

      <Map />
    </div>
  );
}

export default App;
