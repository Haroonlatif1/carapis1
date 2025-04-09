import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Bodies from "./bodies";

const Dashboard = () => {
  const [showCarComponent, setShowCarComponent] = useState(false);
  const [showBodiesComponent, setShowBodiesComponent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchVehicleClick = () => {
    setShowCarComponent(true);
    setShowBodiesComponent(false);
    setSidebarOpen(false); // Close the sidebar when a link is clicked
  };

  const handleBodiesClick = () => {
    setShowBodiesComponent(true);
    setShowCarComponent(false);
    setSidebarOpen(false); // Close the sidebar when a link is clicked
  };

  const onhandler = () => {
    alert("No content right now stay tuned");
    setSidebarOpen(false); // Close the sidebar when a link is clicked
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div
            className={`col-md-2 bg-dark text-white position-fixed min-vh-100 ${
              sidebarOpen ? "d-block" : "d-none d-md-block"
            }`}
            style={{ top: 0, left: 0, paddingTop: "20px", zIndex: 1 }}
          >
            <nav className="navbar navbar-dark">
              <ul className="navbar-nav flex-column w-100">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/car"
                    onClick={handleSearchVehicleClick}
                  >
                    Search Vehicle Freetest Api
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/bodies"
                    onClick={handleBodiesClick}
                  >
                    Search Vehicle CarApi
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onhandler}>
                    Vehicle Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onhandler}>
                    Maintenance Records
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onhandler}>
                    Customer Support
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={onhandler}>
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
                <Link className="navbar-brand" to="/">
                  Vehicle Dashboard
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleSidebar}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </nav>

            {/* Render components based on selection */}
            <div className="p-3">
              <Routes>
                <Route path="/bodies" element={<Bodies />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;