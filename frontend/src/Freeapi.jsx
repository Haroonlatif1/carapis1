import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./freeapi.css";

function App() {
  const [make, setMake] = useState("");
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_url = "https://api.api-ninjas.com/v1/cars";
  const api_key = "APIZDkTe6uq2idnclXON+A==74LYp2QeX3KDLxAP";

  const handleMakeChange = async (event) => {
    const newMake = event.target.value;
    setMake(newMake);
    if (newMake.length > 2) {
      try {
        const response = await axios.get(api_url, {
          headers: { "X-Api-Key": api_key },
          params: { make: newMake },
        });
        const suggestions = response.data.map((car) => car.make);
        setSuggestions(suggestions);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = async (event) => {
    const selectedMake = event.target.textContent;
    setSelectedMake(selectedMake);
    try {
      const response = await axios.get(api_url, {
        headers: { "X-Api-Key": api_key },
        params: { make: selectedMake },
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2>Car Make Search</h2>
            </div>
            <div className="card-body">
              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="make">Enter Car Make:</label>
                <input
                  type="text"
                  className="form-control"
                  id="make"
                  value={make}
                  onChange={handleMakeChange}
                  placeholder="Enter car make"
                />
                {suggestions.length > 0 && (
                  <div className="list-group" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#fff', border: '1px solid #ddd', padding: '10px', zIndex: 1000 }}>
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        className="list-group-item list-group-item-action"
                        onClick={handleSuggestionSelect}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selectedMake && (
                <div style={{ marginTop: '100px' }}>
                  <h3>Selected Make: {selectedMake}</h3>
                  {data.map((car) => (
                    <div key={car.make + car.model}>
                      <h3>
                        {car.make} {car.model}
                      </h3>
                      <p>
                        <strong>Year:</strong> {car.year}
                      </p>
                      <p>
                        <strong>Transmission:</strong> {car.transmission}
                      </p>
                      <p>
                        <strong>Fuel Type:</strong> {car.fuel_type}
                      </p>
                      <p>
                        <strong>Drive:</strong> {car.drive}
                      </p>
                      <p>
                        <strong>Cylinders:</strong> {car.cylinders}
                      </p>
                      <p>
                        <strong>City MPG:</strong> {car.city_mpg}
                      </p>
                      <p>
                        <strong>Highway MPG:</strong> {car.highway_mpg}
                      </p>
                      <p>
                        <strong>Combined MPG:</strong> {car.combined_mpg}
                      </p>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;