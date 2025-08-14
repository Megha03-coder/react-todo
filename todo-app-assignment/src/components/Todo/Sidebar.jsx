import React from 'react'

export default function Sidebar({ activeView, onViewChange }) {
  const menuItems = [
    { id: 'add', label: 'Add Task', icon: '➕' },
    { id: 'view', label: 'View Tasks', icon: '📋' },
    { id: 'calendar', label: 'Add to Calendar', icon: '📅' }
  ]

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Todo Menu</h2>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
