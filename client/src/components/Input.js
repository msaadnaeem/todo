import React, { useState } from "react";
const Input = () => {
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">Input Todo</h1>
      <form className="d-flex mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-dark">Add</button>
      </form>
    </>
  );
};

export default Input;
