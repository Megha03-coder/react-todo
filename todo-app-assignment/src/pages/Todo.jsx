import React, { useEffect, useState } from 'react'
import AddOrEdit from '../components/Todo/AddorEdit';
import TodoList from '../components/Todo/Lists';



const STORAGE_KEY = 'todos';
export default function TodoPage() {
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTodos(JSON.parse(raw))
    } catch (err) {
      console.error('Failed to parse todos from localStorage', err)
      setTodos([])
    }
  }, [])

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (err) {
      console.error('Failed to save todos to localStorage', err)
    }
  }, [todos])

  const handleSave = (todo) => {
    if (editingTodo) {
  
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)))
      setEditingTodo(null)
    } else {
      setTodos((prev) => [todo, ...prev])
    }
  }

  const handleEdit = (todo) => setEditingTodo(todo)
  const handleCancelEdit = () => setEditingTodo(null)

  const handleDelete = (id) => {
    const ok = window.confirm('Delete this todo?')
    if (!ok) return
    setTodos((prev) => prev.filter((t) => t.id !== id))
    if (editingTodo && editingTodo.id === id) setEditingTodo(null)
  }

  return (
    <div className="todo-page">
      <div className="todo-left">
        <AddOrEdit onSave={handleSave} editingTodo={editingTodo} onCancel={handleCancelEdit} />
      </div>

      <div className="todo-right">
        <div className="todo-stats">
          <strong>{todos.length}</strong> {todos.length === 1 ? 'todo' : 'todos'}
        </div>
        <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  )
}