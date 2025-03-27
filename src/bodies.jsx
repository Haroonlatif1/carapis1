import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Car = () => {
  const [car, setCar] = useState({});
  const [error, setError] = useState(null);
  const [state, setState] = useState('');
  const [numberPlate, setNumberPlate] = useState('');

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleNumberPlateChange = (event) => {
    setNumberPlate(event.target.value);
  };

  const handleGetData = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/numberplate/${state}/${numberPlate}`);
      const data = await response.json();
      setCar(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error fetching car data');
      setCar({});
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4"> Car Lookup</h2>

        <div className="mb-3">
          <label className="form-label fw-bold">Enter State:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter State"
            value={state}
            onChange={handleStateChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Enter Number Plate:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Number Plate"
            value={numberPlate}
            onChange={handleNumberPlateChange}
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleGetData}>
          🔍 Get Data
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {car.id && (
          <div className="mt-4">
            <h3 className="text-center">📄 Car Details</h3>
            <ul className="list-group">
              <li className="list-group-item"><strong>ID:</strong> {car.id}</li>
              <li className="list-group-item"><strong>Make:</strong> {car.make}</li>
              <li className="list-group-item"><strong>Model:</strong> {car.model}</li>
              <li className="list-group-item"><strong>Year:</strong> {car.year}</li>
              <li className="list-group-item"><strong>Color:</strong> {car.color}</li>
              <li className="list-group-item"><strong>Mileage:</strong> {car.mileage} miles</li>
              <li className="list-group-item"><strong>Price:</strong> ${car.price}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Bodies = () => {
    const [bodies, setBodies] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    const handlePageChange = (event) => {
      setPage(event.target.value);
    };
  
    const handleGetData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/bodies?page=${page}`);
        const data = await response.json();
        setBodies(data.data);
        setTotalPages(data.collection.pages);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Error fetching bodies data');
        setBodies([]);
      }
    };
  
    const handlePreviousPage = () => {
      if (page > 1) {
        setPage(page - 1);
        handleGetData();
      }
    };
  
    const handleNextPage = () => {
      if (page < totalPages) {
        setPage(page + 1);
        handleGetData();
      }
    };
  
    return (
      <div className="container mt-5">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">🚗 Car Details from CarApi </h2>
          <h6  className="text-center mb-4">Subscription required</h6>
  
          <div className="mb-3">
            <label className="form-label fw-bold">Select Page:</label>
            <select
              className="form-select"
              value={page}
              onChange={handlePageChange}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
            
  
          <button className="btn btn-primary mt-3" onClick={handleGetData}>
            🔍 Get Data
          </button>
          <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-primary" onClick={handlePreviousPage}>
                Previous
              </button>
              <button className="btn btn-primary" onClick={handleNextPage}>
                Next
              </button>
            </div>
          </div>
  
          {error && <div className="alert alert-danger mt-3">{error}</div>}
  
          {bodies.length > 0 && (
            <div className="mt-4">
              <h3 className="text-center">📄 Car details</h3>
              <ul className="list-group">
                {bodies.map((body) => (
                  <li key={body.id} className="list-group-item">
                    <strong>ID:</strong> {body.id}
                    <br />
                    <strong>Make Model Trim ID:</strong> {body.make_model_trim_id}
                    <br />
                    <strong>Type:</strong> {body.type}
                    <br />
                    <strong>Doors:</strong> {body.doors}
                    <br />
                    <strong>Length:</strong> {body.length}
                    <br />
                    <strong>Width:</strong> {body.width}
                    <br />
                    <strong>Height:</strong> {body.height}
                    <br />
                    <strong>Wheel Base:</strong> {body.wheel_base}
                    <br />
                    <strong>Front Track:</strong> {body.front_track}
                    <br />
                    <strong>Rear Track:</strong> {body.rear_track}
                    <br />
                    <strong>Ground Clearance:</strong> {body.ground_clearance}
                    <br />
                    <strong>Cargo Capacity:</strong> {body.cargo_capacity}
                    <br />
                    <strong>Max Cargo Capacity:</strong> {body.max_cargo_capacity}
                    <br />
                    <strong>Curb Weight:</strong> {body.curb_weight}
                    <br />
                    <strong>Gross Weight:</strong> {body.gross_weight}
                    <br />
                    <strong>Max Payload:</strong> {body.max_payload}
                    <br />
                    <strong>Max Towing Capacity:</strong> {body.max_towing_capacity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
const App = () => {
  return (
    <div>
      {/* <Car /> */}
      <Bodies />
    </div>
  );
};

export default App;