import React, { useEffect, useState } from 'react'

export default function AddOrEdit({ onSave, editingTodo, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '')
      setDescription(editingTodo.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [editingTodo])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
    
      alert('Please provide a title for the todo.')
      return
    }

    const todo = {
      id: editingTodo ? editingTodo.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      updatedAt: new Date().toISOString(),
    }

    onSave(todo)

    
    if (!editingTodo) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editingTodo ? 'Edit Todo' : 'Add Todo'}</h2>

      <label className="label">
        <span>Title *</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </label>

      <label className="label">
        <span>Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        />
      </label>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          {editingTodo ? 'Update' : 'Save'}
        </button>
        {editingTodo && (
          <button className="btn btn-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}