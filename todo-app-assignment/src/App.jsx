import { useState } from 'react'
import './App.css'
import Todo from './pages/Todo';
import Sidebar from './components/Todo/Sidebar';

export default function App() {
  const [activeView, setActiveView] = useState('add') // Default to 'add' view

  const handleViewChange = (view) => {
    setActiveView(view)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Simple Todo App</h1>
      </header>
      <main className="app-main">
        <div className="sidebar-container">
          <Sidebar activeView={activeView} onViewChange={handleViewChange} />
        </div>
        <div className="content-container">
          <Todo activeView={activeView} />
        </div>
      </main>
    </div>
  )
}

