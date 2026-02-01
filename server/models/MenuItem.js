const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },

    description: {
      type: String
    },

    category: {
      type: String,
      required: true,
      enum: ["Appetizer", "Main Course", "Dessert", "Beverage"]
    },

    price: {
      type: Number,
      required: true
    },

    ingredients: {
      type: [String],
      default: []
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    preparationTime: {
      type: Number
    },

    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// TEXT INDEX FOR SEARCH
menuItemSchema.index({
  name: "text",
  description: "text",
  ingredients: "text"
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
