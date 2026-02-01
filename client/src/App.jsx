import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";
import Navbar from "./components/Navbar";
import AddItemPage from "./pages/AddItemPage";
import BestDishesPage from "./pages/BestDishesPage";





function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/add-item" element={<AddItemPage />} />
        <Route path="/best-dishes" element={<BestDishesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
