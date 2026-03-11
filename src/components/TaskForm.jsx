import React, { useState } from 'react';

// TaskForm component - a simple form to add new tasks
// Now includes a priority select

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault(); // prevent page refresh

    // Make sure title is not empty
    if (title.trim() === '') {
      alert('Please enter a task title!');
      return;
    }

    // Call the parent function to add the task
    onAddTask(title.trim(), description.trim(), priority);

    // Clear the form
    setTitle('');
    setDescription('');
    setPriority('low'); // reset to default
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title">Task Title *</label>
        <input
          id="task-title"
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-desc">Description</label>
        <textarea
          id="task-desc"
          placeholder="Optional description..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={1}
        />
      </div>
      <div className="form-group priority-group">
        <label htmlFor="task-priority">Priority</label>
        <select 
          id="task-priority"
          value={priority} 
          onChange={e => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="add-btn">Add Task</button>
    </form>
  );
}

export default TaskForm;
