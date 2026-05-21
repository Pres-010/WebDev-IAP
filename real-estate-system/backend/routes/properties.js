const express = require("express");
const router = express.Router();
const db = require("../database/db");


// GET all properties
router.get("/", (req, res) => {
  db.all("SELECT * FROM properties", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    res.json(rows);
  });
});


// ADD property
router.post("/", (req, res) => {
  console.log("BODY RECEIVED:", req.body); // 🔥 debug line

  const {
    title,
    type,
    purpose,
    price,
    location,
    description,
    broker_id
  } = req.body;

  const sql = `
    INSERT INTO properties
    (title, type, purpose, price, location, description, broker_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [title, type, purpose, price, location, description, broker_id],
    function (err) {
      if (err) {
        console.log("DB ERROR:", err.message);
        return res.status(500).json(err.message);
      }

      console.log("INSERTED ID:", this.lastID);

      res.json({
        message: "Property added",
        id: this.lastID
      });
    }
  );
});

module.exports = router;