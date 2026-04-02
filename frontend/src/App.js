import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = `${process.env.REACT_APP_API_URL}/employees`;

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    salary: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get(API_URL);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({
      name: "",
      department: "",
      salary: ""
    });

    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      department: emp.department,
      salary: emp.salary
    });
    setEditId(emp.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEmployees();
  };

  return (
    <div className="container">
      <h1>Employee Management Application</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter employee name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Enter department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Enter salary"
          value={form.salary}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;