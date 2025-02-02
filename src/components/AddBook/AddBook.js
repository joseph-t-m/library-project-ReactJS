import { useState } from "react";

import "./AddBook.css";

const AddBook = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <form className="add-Book-form" onSubmit={submitForm}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add Book"
            value={title}
            onChange={(eTitle) => setTitle(eTitle.target.value)}
          />
          <textarea
            id="commentTXT"
            placeholder="Add Comment"
            rows="4"
            cols="50"
            value={description}
            onChange={(inp) => setDescription(inp.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="form-btn">
          Add to Library
        </button>
      </form>
    </div>
  );
};

export default AddBook;
