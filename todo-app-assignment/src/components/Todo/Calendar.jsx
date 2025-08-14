import React, { useState } from 'react';
import './Calendar.css';

export default function Calendar({ todos, onAddToCalendar }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Get calendar days for the current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date));
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getTasksForDate = (date) => {
    const dateStr = formatDate(date);
    return todos.filter(todo => todo.calendarDate === dateStr);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowTaskModal(true);
  };

  const handleAddTaskToDate = (taskId) => {
    if (selectedDate) {
      onAddToCalendar(taskId, formatDate(selectedDate));
      setShowTaskModal(false);
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const calendarDays = getCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav-btn calendar-nav-prev" onClick={() => navigateMonth(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h3 className="calendar-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button className="calendar-nav-btn calendar-nav-next" onClick={() => navigateMonth(1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {dayNames.map(day => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-days">
          {calendarDays.map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = formatDate(date) === formatDate(new Date());
            const tasksForDate = getTasksForDate(date);
            
            return (
              <div
                key={index}
                className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${selectedDate && formatDate(selectedDate) === formatDate(date) ? 'selected' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                <div className="calendar-day-number">{date.getDate()}</div>
                {tasksForDate.length > 0 && (
                  <div className="calendar-task-dots">
                    {tasksForDate.map((task, idx) => (
                      <div key={idx} className="calendar-task-dot" title={task.title}></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showTaskModal && (
        <div className="calendar-modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-modal-header">
              <h4>Schedule Task for {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
              <button className="calendar-modal-close" onClick={() => setShowTaskModal(false)}>×</button>
            </div>
            
            <div className="calendar-task-list">
              <h5>Unscheduled Tasks</h5>
              {todos.filter(todo => !todo.calendarDate).length > 0 ? (
                todos.filter(todo => !todo.calendarDate).map(todo => (
                  <div key={todo.id} className="calendar-task-item">
                    <div className="calendar-task-info">
                      <strong>{todo.title}</strong>
                      {todo.description && <p>{todo.description}</p>}
                    </div>
                    <button 
                      className="btn btn-primary calendar-add-btn"
                      onClick={() => handleAddTaskToDate(todo.id)}
                    >
                      Schedule
                    </button>
                  </div>
                ))
              ) : (
                <div className="calendar-empty-state">
                  <p>🎉 All tasks are scheduled!</p>
                  <p>Add new tasks from the "Add Task" section.</p>
                </div>
              )}
            </div>
            
            <div className="calendar-modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowTaskModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
