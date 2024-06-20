import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddAccommodation from "./components/AddAccommodations";
import Home from "./components/Home";
import AllAccommodations from "./components/AllAccommodations";
import UpdateAccommodations from "./components/UpdateAccommodations";

function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddAccommodation />} />
          <Route path="/accommodationDashboard" element={<AllAccommodations/>} />
          <Route path="/update/:id" element={<UpdateAccommodations />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
