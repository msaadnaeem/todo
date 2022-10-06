import { useState } from "react";
import "./List.css";

const Edit = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const updateNote = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
    } catch (error) {
      console.error(error.message);
    }
    window.location = "/";
  };
  return (
    <>
      <button
        type="button"
        class="btn btnlist"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        <i class="bi bi-pencil-square"></i>{" "}
      </button>

      <div
        class="modal fade"
        id={`id${todo.todo_id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit todo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handleEdit(e)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
