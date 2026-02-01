require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");
const Order = require("./models/Order");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const seedData = async () => {
  try {
    console.log("Clearing old data...");
    await MenuItem.deleteMany();
    await Order.deleteMany();

    console.log("Seeding menu items...");

    const menuItems = await MenuItem.insertMany([
      {
        name: "Burger",
        description: "Juicy grilled beef burger with cheese",
        category: "Main Course",
        price: 150,
        ingredients: ["bread", "cheese", "patty"],
        preparationTime: 10,
        imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        isAvailable: true,
      },
      {
        name: "Pizza",
        description: "Classic margherita pizza",
        category: "Main Course",
        price: 250,
        ingredients: ["cheese", "tomato", "dough"],
        preparationTime: 15,
        imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D",
        isAvailable: true,
      },
      {
        name: "Pasta",
        description: "Creamy white sauce pasta",
        category: "Main Course",
        price: 180,
        ingredients: ["pasta", "cream", "garlic"],
        preparationTime: 12,
        imageUrl:"https://images.unsplash.com/photo-1525755662778-989d0524087e",
        isAvailable: true,
      },
      {
        name: "Fried Rice",
        description: "Vegetable fried rice",
        category: "Main Course",
        price: 200,
        ingredients: ["rice", "vegetables"],
        preparationTime: 9,
        imageUrl: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJpZWQlMjByaWNlfGVufDB8fDB8fHww",
        isAvailable: true,
      },
      {
        name: "Sandwich",
        description: "Grilled veggie sandwich",
        category: "Appetizer",
        price: 120,
        ingredients: ["bread", "vegetables"],
        preparationTime: 7,
        imageUrl: "https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbmR3aWNofGVufDB8fDB8fHww",
        isAvailable: true,
      },
      {
        name: "French Fries",
        description: "Crispy salted fries",
        category: "Appetizer",
        price: 90,
        ingredients: ["potato", "salt"],
        preparationTime: 6,
        imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZyaWVzfGVufDB8fDB8fHww",
        isAvailable: true,
      },
      {
        name: "Garlic Bread",
        description: "Toasted garlic bread",
        category: "Appetizer",
        price: 110,
        ingredients: ["bread", "garlic"],
        preparationTime: 5,
        imageUrl: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D",
        isAvailable: true,
      },
      {
        name: "Momos",
        description: "Steamed veg dumplings",
        category: "Appetizer",
        price: 140,
        ingredients: ["flour", "vegetables"],
        preparationTime: 8,
        imageUrl: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9tb3N8ZW58MHx8MHx8fDA%3D",
        isAvailable: true,
      },
      {
        name: "Noodles",
        description: "Spicy stir-fried noodles",
        category: "Main Course",
        price: 170,
        ingredients: ["noodles", "sauce"],
        preparationTime: 10,
        imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
        isAvailable: true,
      },
      {
        name: "Coke",
        description: "Chilled cola drink",
        category: "Beverage",
        price: 40,
        ingredients: ["cola"],
        preparationTime: 1,
        imageUrl: "https://plus.unsplash.com/premium_photo-1725075086631-b21a5642918b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sYXxlbnwwfHwwfHx8MA%3D%3D",
        isAvailable: true,
      },
      {
        name: "Pepsi",
        description: "Refreshing soft drink",
        category: "Beverage",
        price: 40,
        ingredients: ["cola"],
        preparationTime: 1,
        imageUrl: "https://images.unsplash.com/photo-1546695244-22170c3ade72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcHNpfGVufDB8fDB8fHww",
        isAvailable: true,
      },
      {
        name: "Orange Juice",
        description: "Fresh orange juice",
        category: "Beverage",
        price: 60,
        ingredients: ["orange"],
        preparationTime: 2,
        imageUrl: "https://plus.unsplash.com/premium_photo-1667543228378-ec4478ab2845?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JhbmdlJTIwanVpY2V8ZW58MHx8MHx8fDA%3D",
        isAvailable: true,
      },
      {
        name: "Chocolate Cake",
        description: "Rich chocolate dessert",
        category: "Dessert",
        price: 130,
        ingredients: ["chocolate", "flour"],
        preparationTime: 12,
        imageUrl: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
        isAvailable: true,
      },
      {
        name: "Ice Cream",
        description: "Vanilla ice cream scoop",
        category: "Dessert",
        price: 90,
        ingredients: ["milk", "sugar"],
        preparationTime: 2,
        imageUrl: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFuaWxsYSUyMGljZSUyMGNyZWFtfGVufDB8fDB8fHww",
        isAvailable: true,
      },
      {
        name: "Brownie",
        description: "Warm chocolate brownie",
        category: "Dessert",
        price: 100,
        ingredients: ["chocolate", "butter"],
        preparationTime: 6,
        imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnJvd25pZXxlbnwwfHwwfHx8MA%3D%3D",
        isAvailable: true,
      },
    ]);

    console.log("Menu items seeded:", menuItems.length);

    console.log("Seeding orders...");

    const randomItem = () =>
      menuItems[Math.floor(Math.random() * menuItems.length)];

    const statuses = [
      "Pending",
      "Preparing",
      "Ready",
      "Delivered",
      "Cancelled",
    ];

    const orders = [];

    for (let i = 1; i <= 12; i++) {
      const item1 = randomItem();
      const item2 = randomItem();

      const total = item1.price + item2.price * 2;

      orders.push({
  orderNumber: `ORD-${Date.now()}-${i}`, // REQUIRED
  items: [
    { menuItem: item1._id, quantity: 1, price: item1.price },
    { menuItem: item2._id, quantity: 2, price: item2.price },
  ],
  totalAmount: total,
  status: statuses[Math.floor(Math.random() * statuses.length)],
  customerName: `Customer ${i}`,
  tableNumber: i,
});
    }

    await Order.insertMany(orders);

    console.log("Orders seeded:", orders.length);
    console.log("Seeding complete 🎉");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
