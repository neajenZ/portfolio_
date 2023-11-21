import React from 'react';
import './global.css'
import {Header} from "./Components/Header/Header";
import {MainDescription} from "./Components/MainDescription/MainDescription";
import {CatalogNav} from "./Components/Catalog/CatalogNav";
import {MainSection} from "./Components/MainSection/MainSection";
import {Footer} from "./Components/Footer/Footer";
import {Routes, Route} from 'react-router-dom'
import {HomePage} from "./HomePage";

function App() {
  return (
      <Routes>
          <Route path={''} element={<HomePage />} />
          <Route path={'/category/:id'} element={<HomePage />} />
      </Routes>
  )
}

export default App;
