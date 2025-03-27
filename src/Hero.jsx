import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Car from "./Car";
import Bodies from "./bodies";

const Dashboard = () => {
  const [showCarComponent, setShowCarComponent] = useState(false);
  const [showBodiesComponent, setShowBodiesComponent] = useState(false);

  const handleSearchVehicleClick = () => {
    setShowCarComponent(true);
    setShowBodiesComponent(false);
  };

  const handleBodiesClick = () => {
    setShowBodiesComponent(true);
    setShowCarComponent(false);
  };
  const onhandler=()=>{
    alert("No content right now stay tuned")
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-2 bg-dark text-white d-none d-md-block position-fixed min-vh-100"
          style={{ top: 0, left: 0, paddingTop: "20px" }}
        >
          <nav className="navbar navbar-dark">
            <ul className="navbar-nav flex-column w-100">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={handleSearchVehicleClick}
                  style={{ cursor: "pointer" }}
                >
Search Vehicle Freetest Api                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={handleBodiesClick}
                  style={{ cursor: "pointer" }}
                >
Search Vehicle CarApi                 </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={onhandler}>
                    
                  Vehicle Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"  onClick={onhandler}>
                  Maintenance Records
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"  onClick={onhandler}>
                  Customer Support
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"  onClick={onhandler}>
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main content area */}
        <div className="col-md-10 offset-md-2">
          {/* Top Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Vehicle Dashboard
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </nav>

          {/* Sidebar for smaller screens */}
          <div className="collapse d-md-none bg-dark p-3" id="sidebarMenu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  onClick={handleSearchVehicleClick}
                  style={{ cursor: "pointer" }}
                >
                  Search Vehicle Freetest Api
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={handleBodiesClick}
                  style={{ cursor: "pointer" }}
                > Search Vehicle CarApi

                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Vehicle Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Maintenance Records
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Customer Support
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Render components based on selection */}
          <div className="p-3">
            {showCarComponent && <Car />}
            {showBodiesComponent && <Bodies />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
