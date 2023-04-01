import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./module/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RestorePage from "./pages/RestorePage/RestorePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import StoragePage from "./pages/StoragePage/StoragePage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restore" element={<RestorePage />} />
        <Route path="/storage" element={<StoragePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
