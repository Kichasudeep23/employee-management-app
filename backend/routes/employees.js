const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, department, salary } = req.body;
    const result = await pool.query(
      "INSERT INTO employees (name, department, salary) VALUES ($1, $2, $3) RETURNING *",
      [name, department, salary]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, salary } = req.body;

    const result = await pool.query(
      "UPDATE employees SET name = $1, department = $2, salary = $3 WHERE id = $4 RETURNING *",
      [name, department, salary, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM employees WHERE id = $1", [id]);
    res.json("Employee deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
