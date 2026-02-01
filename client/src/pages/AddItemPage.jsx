import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddItemPage.css";

const API = import.meta.env.VITE_API_URL;

function AddItemPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Main Course",
    price: "",
    ingredients: "",
    preparationTime: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      category: "Main Course",
      price: "",
      ingredients: "",
      preparationTime: "",
      imageUrl: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        price: Number(form.price),

        preparationTime: form.preparationTime
          ? Number(form.preparationTime)
          : 0,

        ingredients: form.ingredients
          ? form.ingredients.split(",").map((i) => i.trim())
          : [],

        imageUrl: form.imageUrl.trim(),
      };

      await axios.post(`${API}/menu`, payload);

      alert("Item Added Successfully!");

      resetForm();     // clear fields
      navigate("/");   // go back to menu
    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  };

  return (
    <div className="add-page">
      <div className="add-card">
        <h2>Add Menu Item</h2>

        <form className="add-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>Main Course</option>
            <option>Appetizer</option>
            <option>Dessert</option>
            <option>Beverage</option>
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price"
            min="1"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={form.ingredients}
            onChange={handleChange}
          />

          <input
            name="preparationTime"
            type="number"
            placeholder="Prep Time (mins)"
            min="0"
            value={form.preparationTime}
            onChange={handleChange}
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
          />

          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
}

export default AddItemPage;
