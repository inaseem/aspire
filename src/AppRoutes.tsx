import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cards from "./pages/Cards/Cards";
import Credit from "./pages/Credit";
import Home from "./pages/Home";
import Payments from "./pages/Payments";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/cards");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/credit" element={<Credit />} />
    </Routes>
  );
};

export default AppRoutes;
