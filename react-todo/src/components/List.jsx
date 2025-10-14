import { useState } from 'react';

export default function List({ completed, title, id, todoData, setTodoData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const btnStyle = {
    color: '#000',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right',
  };

  const listStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none',
    };
  };

  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  const handleCompleChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = () => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    setIsEditing(false);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between w-full px-4">
        <form onSubmit={handleSubmit}>
          <input value={editedTitle} onChange={handleEditChange} autoFocus />
        </form>
        <div>
          <button style={btnStyle} onClick={() => setIsEditing(false)}>
            X
          </button>
          <button style={btnStyle} type="submit" onClick={handleSubmit}>
            save
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={listStyle(completed)}>
        <input
          type="checkbox"
          onChange={() => handleCompleChange(id)}
          defaultChecked={completed}
        />{' '}
        {title}
        <button style={btnStyle} onClick={() => handleClick(id)}>
          X
        </button>
        <button style={btnStyle} onClick={() => setIsEditing(true)}>
          edit
        </button>
      </div>
    );
  }
}
