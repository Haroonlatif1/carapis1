import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Car from "./Car";
import Bodies from "./bodies";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);

  const onHandler = () => {
    alert("No content right now, stay tuned");
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for larger screens */}
          <div
            className="col-md-2 bg-dark text-white d-none d-md-block position-fixed min-vh-100"
            style={{ top: 0, left: 0, paddingTop: "20px" }}
          >
            <nav className="navbar navbar-dark">
              <ul className="navbar-nav flex-column w-100">
                <li className="nav-item">
                  <Link className="nav-link active" to="/car">
                    Search Vehicle Freetest Api
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/bodies">
                    Search Vehicle CarApi
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onHandler}>
                    Vehicle Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onHandler}>
                    Maintenance Records
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onHandler}>
                    Customer Support
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onHandler}>
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Top Navbar for mobile */}
          <nav className="navbar navbar-expand-md navbar-dark bg-dark d-md-none w-100">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Vehicle Dashboard</a>
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleNavbar}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link active" to="/car" onClick={toggleNavbar}>
                      Search Vehicle Freetest Api
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/bodies" onClick={toggleNavbar}>
                      Search Vehicle CarApi
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={onHandler}>
                      Vehicle Reports
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={onHandler}>
                      Maintenance Records
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={onHandler}>
                      Customer Support
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={onHandler}>
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main content area */}
          <div className="col-md-10 offset-md-2">
            <div className="p-3">
              <Routes>
                <Route path="/car" element={<Car />} />
                <Route path="/bodies" element={<Bodies />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
