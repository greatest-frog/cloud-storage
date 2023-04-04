import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./modules/Header/Header";
import Footer from "./UI/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RestorePage from "./pages/RestorePage/RestorePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import StoragePage from "./pages/StoragePage/StoragePage";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isScrolled, setIsScrolled] = useState(!!window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", () => setIsScrolled(!!window.scrollY));
    return () => {
      window.removeEventListener("scroll", () =>
        setIsScrolled(!!window.scrollY)
      );
    };
  });

  return (
    <div className="App">
      <Header border={isScrolled} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/restore" element={<RestorePage />} />
          <Route path="/storage" element={<StoragePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
