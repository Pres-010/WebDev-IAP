const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const app = express();

// middleware
app.use(cors());              // 🔥 THIS FIXES YOUR ERROR
app.use(express.json());

// routes
const propertiesRoutes = require("./routes/properties");
app.use("/properties", propertiesRoutes);
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});