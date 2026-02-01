import { useEffect, useState } from "react";
import axios from "axios";
import "./BestDishesPage.css";

function BestDishesPage() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchTopDishes = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/orders/top-items"
      );
      setDishes(res.data);
    };

    fetchTopDishes();
  }, []);

  return (
    <div className="best-page">
      <h1>🔥 Top 5 Best Selling Dishes</h1>

      <div className="best-grid">
        {dishes.map((dish, index) => (
          <div className="best-card" key={index}>
            {dish.imageUrl && (
              <img src={dish.imageUrl} alt={dish.name} />
            )}
            <h3>{dish.name}</h3>
            <p>Price: ₹{dish.price}</p>
            <p className="sold">Sold: {dish.totalSold}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestDishesPage;
