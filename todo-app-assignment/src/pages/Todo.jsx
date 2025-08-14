import React, { useEffect, useState } from 'react'
import AddOrEdit from '../components/Todo/AddorEdit';
import TodoList from '../components/Todo/Lists';
import Calendar from '../components/Todo/Calendar';

const STORAGE_KEY = 'todos';
export default function TodoPage({ activeView }) {
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

  const handleAddToCalendar = (taskId, date) => {
    setTodos((prev) => 
      prev.map((todo) => 
        todo.id === taskId 
          ? { ...todo, calendarDate: date }
          : todo
      )
    )
  }

  const renderContent = () => {
    switch (activeView) {
      case 'add':
        return (
          <div className="todo-section">
            <h2>Add New Task</h2>
            <AddOrEdit 
              onSave={handleSave} 
              editingTodo={editingTodo} 
              onCancel={handleCancelEdit} 
            />
          </div>
        )
      
      case 'view':
        return (
          <div className="todo-section">
            <h2>Your Tasks</h2>
            <div className="todo-stats">
              <strong>{todos.length}</strong> {todos.length === 1 ? 'task' : 'tasks'}
            </div>
            <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        )
      
      case 'calendar':
        return (
          <div className="todo-section">
            <h2>Calendar - Schedule Your Tasks</h2>
            <Calendar 
              todos={todos} 
              onAddToCalendar={handleAddToCalendar}
            />
          </div>
        )
      
      default:
        return (
          <div className="todo-section">
            <h2>Welcome to Todo App</h2>
            <p>Select an option from the sidebar to get started!</p>
          </div>
        )
    }
  }

  return (
    <div className="todo-content">
      {renderContent()}
    </div>
  )
}
