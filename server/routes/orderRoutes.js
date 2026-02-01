const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate("items.menuItem")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/top-items", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.menuItem",
          totalSold: { $sum: "$items.quantity" }
        }
      },

      {
        $lookup: {
          from: "menuitems",   // IMPORTANT: collection name
          localField: "_id",
          foreignField: "_id",
          as: "menu"
        }
      },

      { $unwind: "$menu" },

      { $sort: { totalSold: -1 } },
      { $limit: 5 },

      {
        $project: {
          _id: 0,
          name: "$menu.name",
          imageUrl: "$menu.imageUrl",
          price: "$menu.price",
          totalSold: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.menuItem");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE ORDER STATUS
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("items.menuItem");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
