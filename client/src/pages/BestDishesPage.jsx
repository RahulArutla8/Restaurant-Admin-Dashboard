import { useEffect, useState } from "react";
import axios from "axios";
import "./BestDishesPage.css";

const API = import.meta.env.VITE_API_URL;

function BestDishesPage() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopDishes = async () => {
      try {
        const res = await axios.get(`${API}/orders/top-items`);
        setDishes(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load best dishes");
      } finally {
        setLoading(false);
      }
    };

    fetchTopDishes();
  }, []);

  if (loading) return <p className="best-loading">Loading...</p>;
  if (error) return <p className="best-error">{error}</p>;

  return (
    <div className="best-page">
      <h1>🔥 Top 5 Best Selling Dishes</h1>

      {dishes.length === 0 ? (
        <p className="best-empty">No data available</p>
      ) : (
        <div className="best-grid">
          {dishes.map((dish, index) => (
            <div className="best-card" key={index}>
              {dish.imageUrl && (
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="best-img"
                />
              )}

              <h3>{dish.name}</h3>
              <p>Price: ₹{dish.price}</p>
              <p className="sold">Sold: {dish.totalSold}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BestDishesPage;
