import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "../useDebounce";
import "./MenuPage.css";
import { Link } from "react-router-dom";



function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = "";

  const debouncedSearch = useDebounce(search, 300);

  // FETCH MENU ITEMS
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        let url = "http://localhost:5000/api/menu";

        if (debouncedSearch) {
          url = `http://localhost:5000/api/menu/search?q=${debouncedSearch}`;
        } else {
          const params = [];
          if (category) params.push(`category=${category}`);
          if (available) params.push(`available=${available}`);

          if (params.length > 0) {
            url += "?" + params.join("&");
          }
        }

        const res = await axios.get(url);
        setMenu(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenu();
  }, [debouncedSearch, category, available]);

  // TOGGLE AVAILABILITY (OPTIMISTIC UI)
  const toggleAvailability = async (id) => {
    setMenu((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );

    try {
      await axios.patch(
        `http://localhost:5000/api/menu/${id}/availability`
      );
    } catch (error) {
      console.error(error);

      // Rollback
      setMenu((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isAvailable: !item.isAvailable }
            : item
        )
      );

      alert("Failed to update availability");
    }
  };

  const deleteItem = async (id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/menu/${id}`);
    fetchMenu(); // refresh list
  } catch (error) {
    console.error(error);
    alert("Failed to delete item");
  }
};


  return (
    <div className="menu-page">
     <div className="menu-title-div"> 
        <h1 className="menu-title">Menu Management</h1>
      <Link to="/add-item">
        <button className="add-btn">+ Add Item</button>
        </Link>
    </div>


      {/* CONTROLS */}
      <div className="menu-controls">
        <select
          className="menu-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <select
          className="menu-select"
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>

        <input
          className="menu-input"
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* MENU LIST */}
      {menu.length === 0 ? (
        <p className="menu-empty">No items found</p>
      ) : (
        <div className="menu-grid">
          {menu.map((item) => (
            <div className="menu-card" key={item._id}>
              
              {/* IMAGE */}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="menu-img"
                />
              )}

              {/* NAME */}
              <h3 className="menu-name">{item.name}</h3>

              {/* DESCRIPTION */}
              {item.description && (
                <p className="menu-desc">{item.description}</p>
              )}

              {/* PRICE + TIME */}
              <p className="menu-info">
                ₹{item.price}
                {item.preparationTime && ` • ⏱ ${item.preparationTime} mins`}
              </p>

              {/* CATEGORY */}
              <p className="menu-info">Category: {item.category}</p>

              {/* INGREDIENTS */}
              {item.ingredients?.length > 0 && (
                <p className="menu-ingredients">
                  Ingredients: {item.ingredients.join(", ")}
                </p>
              )}

              {/* STATUS */}
              <p
                className={`menu-status ${
                  item.isAvailable ? "available" : "unavailable"
                }`}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </p>

              {/* BUTTON */}
              <div className="buttons-div">
                <button
                className="menu-btn"
                onClick={() => toggleAvailability(item._id)}
              >
                Toggle Availability
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteItem(item._id)}
                >
                Delete
            </button>

            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuPage;
