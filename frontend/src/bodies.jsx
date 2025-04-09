import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LicensePlateLookup = () => {
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);
  const [countryCode, setCountryCode] = useState('US');
  const [licensePlate, setLicensePlate] = useState('');
  const [region, setRegion] = useState('');

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleLicensePlateChange = (event) => {
    setLicensePlate(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleLookup = async () => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('country_code', countryCode);
      params.append('lookup', licensePlate);
      if (['US', 'CA', 'AU'].includes(countryCode)) {  // Added missing parenthesis here
        if (!region) {
          throw new Error('Region is required for US, CA, and AU');
        }
        params.append('region', region);
      }
  
      const response = await axios.get(`http://localhost:3001/api/license-plate?${params.toString()}`);
      setVehicle(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching vehicle data:', error.message);
      setError(error.response?.data?.message || error.message);
      setVehicle(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">🚗 License Plate Lookup</h2>

        <div className="mb-3">
          <label className="form-label fw-bold">Country Code:</label>
          <select 
            className="form-select"
            value={countryCode}
            onChange={handleCountryCodeChange}
          >
            <option value="US">United States (US)</option>
            <option value="CA">Canada (CA)</option>
            <option value="AU">Australia (AU)</option>
            <option value="UK">United Kingdom (UK)</option>
            <option value="FR">France (FR)</option>
            <option value="IE">Ireland (IE)</option>
            <option value="NZ">New Zealand (NZ)</option>
            <option value="MX">Mexico (MX)</option>
            <option value="DE">Germany (DE)</option>
            <option value="CZ">Czech Republic (CZ)</option>
            <option value="PT">Portugal (PT)</option>
          </select>
          <div className="form-text">Select the country where the vehicle is registered</div>
        </div>

        {['US', 'CA', 'AU'].includes(countryCode) && (
          <div className="mb-3">
            <label className="form-label fw-bold">State/Region:</label>
            <input
              type="text"
              className="form-control"
              placeholder={`Enter ${countryCode === 'US' ? 'State' : 'Province/Region'}`}
              value={region}
              onChange={handleRegionChange}
              required
            />
            <div className="form-text">Required for US, Canada, and Australia</div>
          </div>
        )}

        <div className="mb-3">
          <label className="form-label fw-bold">License Plate:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter license plate number"
            value={licensePlate}
            onChange={handleLicensePlateChange}
            required
          />
          <div className="form-text">For testing, include '#TEST' in the plate number</div>
        </div>

        <button className="btn btn-primary w-100" onClick={handleLookup}>
          🔍 Lookup Vehicle
        </button>

        {error && (
          <div className="alert alert-danger mt-3">
            <strong>Error:</strong> {error}
          </div>
        )}

        {vehicle && (
          <div className="mt-4">
            <h3 className="text-center">📄 Vehicle Details</h3>
            <ul className="list-group">
              <li className="list-group-item"><strong>Make:</strong> {vehicle.make || 'N/A'}</li>
              <li className="list-group-item"><strong>Model:</strong> {vehicle.model || 'N/A'}</li>
              <li className="list-group-item"><strong>Year:</strong> {vehicle.year || 'N/A'}</li>
              <li className="list-group-item"><strong>Color:</strong> {vehicle.color || 'N/A'}</li>
              <li className="list-group-item"><strong>VIN:</strong> {vehicle.vin || 'N/A'}</li>
              <li className="list-group-item"><strong>Engine:</strong> {vehicle.engine || 'N/A'}</li>
              <li className="list-group-item"><strong>Fuel Type:</strong> {vehicle.fuel || 'N/A'}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicensePlateLookup;