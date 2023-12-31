import React from 'react';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';
import './interceptors/axios';

import "./styles/global.scss";

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);
root.render(<App callback={() => console.log("renderered")} />);