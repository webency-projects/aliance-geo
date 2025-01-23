import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {StoreProvider} from "app/providers/StoreProvider";
import App from 'app/App.tsx';

import "./app/styles/index.scss";

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreProvider>
          <App />
      </StoreProvider>
  </StrictMode>,
)
