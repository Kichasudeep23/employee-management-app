CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(100),
    salary NUMERIC
);

INSERT INTO employees (name, department, salary) VALUES
('Sudeep', 'CSE', 25000),
('Rahul', 'HR', 30000),
('Ananya', 'Finance', 35000);