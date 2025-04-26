const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Item = require("./models/Item");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mycruddb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes

// Home - List all items
app.get("/", async (req, res) => {
  const items = await Item.find();
  res.render("index", { items });
});

// Create Item
app.post("/add", async (req, res) => {
  const { name, quantity } = req.body;
  await Item.create({ name, quantity });
  res.redirect("/");
});

// Delete Item
app.post("/delete/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Update Item - Load Form
app.get("/edit/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("edit", { item });
});

// Update Item - Submit Update
app.post("/edit/:id", async (req, res) => {
  const { name, quantity } = req.body;
  await Item.findByIdAndUpdate(req.params.id, { name, quantity });
  res.redirect("/");
});

// Stats Page
app.get("/stats", async (req, res) => {
  const totalItems = await Item.countDocuments();
  const items = await Item.find();
  res.render("stats", { totalItems, items });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
