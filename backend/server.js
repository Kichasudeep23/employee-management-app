const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employees");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.use("/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});