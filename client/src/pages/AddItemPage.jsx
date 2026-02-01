import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddItemPage.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        preparationTime: Number(form.preparationTime),
        ingredients: form.ingredients.split(",").map(i => i.trim())
      };

      await axios.post("http://localhost:5000/api/menu", payload);

      alert("Item Added Successfully!");
      navigate("/"); // back to menu
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
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} />

        <select name="category" onChange={handleChange}>
          <option>Main Course</option>
          <option>Appetizer</option>
          <option>Dessert</option>
          <option>Beverage</option>
        </select>

        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} />
        <input name="preparationTime" type="number" placeholder="Prep Time" onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />

        <button type="submit">Add Item</button>
      </form>
    </div>
  </div>
);

}

export default AddItemPage;
