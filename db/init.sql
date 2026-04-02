CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary NUMERIC(10,2) NOT NULL
);

INSERT INTO employees (name, department, salary) VALUES
('Sudeep', 'Development', 25000),
('Rahul', 'HR', 30000),
('Ananya', 'Finance', 35000);
