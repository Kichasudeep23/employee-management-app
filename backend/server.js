app.use("/employees", employeeRoutes);

// 👇 ADD HERE
const { Pool } = require("pg");

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
    console.error(err);
  }
})();

// 👇 already existing
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});