import React, { useState } from 'react';

// TaskCard component - shows a single task as a sticky note card
// It can be dragged to other columns, edited inline, or deleted

function TaskCard({ task, onDeleteTask, onEditTask }) {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority || 'low');

  // State for tracking if this card is being dragged
  const [isDragging, setIsDragging] = useState(false);

  // When we start dragging this card
  function handleDragStart(e) {
    e.dataTransfer.setData('taskId', task.id.toString());
    setIsDragging(true);
  }

  // When we stop dragging
  function handleDragEnd() {
    setIsDragging(false);
  }

  // Save the edited task
  function handleSave() {
    if (editTitle.trim() === '') {
      alert('Title cannot be empty!');
      return;
    }
    onEditTask(task.id, editTitle.trim(), editDescription.trim(), editPriority);
    setIsEditing(false);
  }

  // Cancel editing and reset fields
  function handleCancel() {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority || 'low');
    setIsEditing(false);
  }

  // Get color for priority badge
  function getPriorityColor(priority) {
    if (priority === 'high') return '#d9534f'; // red
    if (priority === 'medium') return '#f0ad4e'; // orange
    return '#5cb85c'; // green
  }

  // If we're in edit mode, show the edit form
  if (isEditing) {
    return (
      <div className="task-card">
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
          />
          <select 
            value={editPriority} 
            onChange={e => setEditPriority(e.target.value)}
            style={{ width: '100%', marginBottom: '6px', padding: '6px' }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div>
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  // Normal view (not editing)
  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-header">
        <div className="card-title">{task.title}</div>
        <span 
          className="priority-badge" 
          style={{ backgroundColor: getPriorityColor(task.priority || 'low') }}
        >
          {task.priority || 'low'}
        </span>
      </div>
      
      {task.description && (
        <div className="card-description">{task.description}</div>
      )}
      
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
