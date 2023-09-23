import React, { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./modules/Header/Header";
import Footer from "./UI/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RestorePage from "./pages/RestorePage/RestorePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import StoragePage from "./pages/StoragePage/StoragePage";
import SharePage from "./pages/SharePage/SharePage";

import "./App.css";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Header positionStatic={location.pathname === "/storage"} />
      <main>
        <div className="page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/restore" element={<RestorePage />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route
              path="/storage/users/:userId/files/:fileName"
              element={<SharePage />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
