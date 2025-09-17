from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Initialize DB
def init_db():
    conn = sqlite3.connect("employees.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS employees(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT, role TEXT, salary REAL)''')
    conn.commit()
    conn.close()

init_db()

# Routes
@app.route("/employees", methods=["GET"])
def get_employees():
    conn = sqlite3.connect("employees.db")
    c = conn.cursor()
    c.execute("SELECT * FROM employees")
    rows = c.fetchall()
    conn.close()
    return jsonify([{"id": r[0], "name": r[1], "role": r[2], "salary": r[3]} for r in rows])

@app.route("/employees", methods=["POST"])
def add_employee():
    data = request.json
    conn = sqlite3.connect("employees.db")
    c = conn.cursor()
    c.execute("INSERT INTO employees(name, role, salary) VALUES(?,?,?)",
              (data["name"], data["role"], data["salary"]))
    conn.commit()
    emp_id = c.lastrowid
    conn.close()
    return jsonify({"id": emp_id})

@app.route("/employees/<int:emp_id>", methods=["DELETE"])
def delete_employee(emp_id):
    conn = sqlite3.connect("employees.db")
    c = conn.cursor()
    c.execute("DELETE FROM employees WHERE id=?", (emp_id,))
    conn.commit()
    deleted = c.rowcount
    conn.close()
    return jsonify({"deleted": deleted})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
