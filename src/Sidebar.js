import React from "react";
import { FaRedoAlt, FaRegDotCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import "./view/App.css";

function Sidebar({ activeMenu, onSelectMenu,admin_id}) {
  const navigate = useNavigate();

  const menus = [
    {
      name: "Huấn luyện lại",
      icon: <FaRedoAlt className="menu-icon" />,
      path: "/retrain", // 
    },
    {
      name: "Huấn luyện",
      icon: <FaRegDotCircle className="menu-icon" />,
      path: "/newtrain", // 
    },
  ];

  const handleClick = (menu) => {
    onSelectMenu(menu.name);
    navigate(menu.path, {state:{
      admin_id: admin_id
    }}); 
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-menu">
        {menus.map((menu, index) => (
          <li
            key={index}
            className={`menu-item ${activeMenu === menu.name ? "active" : ""}`}
            onClick={() => handleClick(menu)}
          >
            {menu.icon}
            <span className="menu-text">{menu.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
