import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "../Sidebar"
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function MainAdminPage() {
  const [activeMenu, setActiveMenu] = useState("Huấn luyện lại");
  const location = useLocation();
  const {id, fullName} = location.state;

  return (
    <div className="dashboard-container">
      <div className="header">
      <div className="header-left">
        <h2>Trang chủ quản trị viên</h2>
      </div>
      <div className="header-right">
        <FaUserCircle className="header-user-icon" />
        <span className="header-username">{fullName}</span>
      </div>
    </div>
      <div className="dashboard">
        <Sidebar activeMenu={activeMenu} onSelectMenu={setActiveMenu} admin_id={id}/>
      </div>
    </div>
  );
}

export default MainAdminPage;
