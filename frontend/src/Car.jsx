// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Car = () => {
//   const [car, setCar] = useState(null);
//   const [error, setError] = useState(null);
//   const [id, setId] = useState('');

//   const handleIdChange = (event) => {
//     setId(event.target.value);
//   };

//   const handleGetData = async () => {
//     try {
//       const response = await axios.get(`https://www.freetestapi.com/api/v1/cars/${id}`);
//       setCar(response.data);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching car data:', error.message);
//       setError('Error fetching car data');
//       setCar(null);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg p-4">
//         <h2 className="text-center mb-4">Car Lookup</h2>

//         <div className="mb-3">
//           <label className="form-label fw-bold">Enter Car ID:</label>
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Enter Car ID"
//             value={id}
//             onChange={handleIdChange}
//           />
//         </div>

//         <button className="btn btn-primary w-100" onClick={handleGetData}>
//           🔍 Get Data
//         </button>

//         {error && <div className="alert alert-danger mt-3">{error}</div>}

//         {car && (
//           <div className="mt-4">
//             <h3 className="text-center">📄 Car Details</h3>
//             <ul className="list-group">
//               <li className="list-group-item"><strong>ID:</strong> {car.id}</li>
//               <li className="list-group-item"><strong>Make:</strong> {car.make}</li>
//               <li className="list-group-item"><strong>Model:</strong> {car.model}</li>
//               <li className="list-group-item"><strong>Year:</strong> {car.year}</li>
//               <li className="list-group-item"><strong>Color:</strong> {car.color}</li>
//               <li className="list-group-item"><strong>Mileage:</strong> {car.mileage} miles</li>
//               <li className="list-group-item"><strong>Price:</strong> ${car.price}</li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Car;
