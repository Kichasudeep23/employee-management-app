const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const employeeRoutes = require("./routes/employees");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.use("/employees", employeeRoutes);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        department VARCHAR(100),
        salary NUMERIC
      );
    `);
    console.log("Table ready ✅");
  } catch (err) {
    console.error("Table creation error:", err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});