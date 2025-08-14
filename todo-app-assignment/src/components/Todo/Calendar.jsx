import React, { useState } from 'react';

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
        <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
          ‹
        </button>
        <h3 className="calendar-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
          ›
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
                className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                <div className="calendar-day-number">{date.getDate()}</div>
                {tasksForDate.length > 0 && (
                  <div className="calendar-task-indicator">
                    {tasksForDate.length} task{tasksForDate.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showTaskModal && (
        <div className="calendar-modal">
          <div className="calendar-modal-content">
            <h4>Add Task to {selectedDate?.toLocaleDateString()}</h4>
            <div className="calendar-task-list">
              {todos.filter(todo => !todo.calendarDate).map(todo => (
                <div key={todo.id} className="calendar-task-item">
                  <span>{todo.title}</span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddTaskToDate(todo.id)}
                  >
                    Add
                  </button>
                </div>
              ))}
              {todos.filter(todo => !todo.calendarDate).length === 0 && (
                <p>No unscheduled tasks available</p>
              )}
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowTaskModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
