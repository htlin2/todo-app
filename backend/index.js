const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM todos ORDER BY id asc");
    res.json(query.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    res.json(query.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const query = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description],
    );
    res.json(query.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const query = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2 RETURNING *",
      [description, id],
    );
    res.json(query.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id],
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
