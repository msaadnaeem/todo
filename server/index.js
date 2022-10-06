const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//get all to dos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id ASC"
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update todo

app.put("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { description } = req.body;
  try {
    const update = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id = $2",
      [description, id]
    );
    res.send(`Todo modified with ID: ${id}`);
  } catch (err) {
    console.error(err.message);
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const update = await pool.query("DELETE from todo WHERE todo_id = $1", [
      id,
    ]);
    res.send(`Todo deleted with ID: ${id}`);
  } catch (err) {
    console.error(err.message);
  }
});
