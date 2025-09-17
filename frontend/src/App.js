import { useEffect, useState } from "react";

function App() {
  const API = "http://localhost:5000/employees";
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", salary: "" });

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    const res = await fetch(API);
    const data = await res.json();
    setEmployees(data);
  }

  async function addEmployee(e) {
    e.preventDefault();
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", role: "", salary: "" });
    loadEmployees();
  }

  async function deleteEmployee(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadEmployees();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Management (React + Flask)</h1>
      <form onSubmit={addEmployee}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          required
        />
        <button type="submit">Add</button>
      </form>

      <h2>Employees</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.role} - ₹{emp.salary}
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
