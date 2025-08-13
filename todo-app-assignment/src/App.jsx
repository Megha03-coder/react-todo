import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './pages/Todo';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Simple Todo App</h1>
      </header>
      <main className="app-main">
        <Todo />
      </main>
    </div>
  )
}

