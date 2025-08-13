import React from 'react'

export default function TodoList({ todos, onEdit, onDelete }) {
  if (!todos || todos.length === 0) {
    return (
      <div className="card empty">
        <p>No todos yet. Add one using the form.</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div className="card todo-item" key={todo.id}>
          <div className="todo-main">
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && <p className="todo-desc">{todo.description}</p>}
          </div>

          <div className="todo-actions">
            <button className="btn" onClick={() => onEdit(todo)}>
              Edit
            </button>
            <button className="btn btn-delete" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}