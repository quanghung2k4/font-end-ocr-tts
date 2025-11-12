import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainAdminPage from "./view/MainAdminPage"; 
import RetrainPage from "./view/RetrainPage"; 
import RetrainResultPage from "./view/RetrainResultPage";
import NewTrainPage from "./view/NewTrainPage";
import NewTrainDetailPage from "./view/NewtrainResultPage";
import Login from "./view/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainAdminPage />} />
        <Route path="/retrain" element={<RetrainPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/newtrain" element={<NewTrainPage />} />
        <Route path="/detail" element={<RetrainResultPage />} />
        <Route path="/detailnewtrain" element={<NewTrainDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
