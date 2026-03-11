import React, { useState } from 'react';
import TaskCard from './TaskCard';

// Column component - represents one column on the kanban board
// It handles drag and drop so we can move tasks between columns

function Column({ title, status, tasks, onDeleteTask, onEditTask, onMoveTask, onDeleteColumn }) {
  // Track if something is being dragged over this column
  const [isDragOver, setIsDragOver] = useState(false);

  // When a dragged item is over the column
  function handleDragOver(e) {
    e.preventDefault(); // needed to allow dropping
    setIsDragOver(true);
  }

  // When the dragged item leaves the column
  function handleDragLeave() {
    setIsDragOver(false);
  }

  // When a task is dropped in this column
  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);

    // Get the task id from the drag data
    const taskId = Number(e.dataTransfer.getData('taskId'));
    // Move the task to this column's status
    onMoveTask(taskId, status);
  }

  return (
    <div
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-title">
        {title}
        <span className="task-count">({tasks.length})</span>
        <button 
          className="delete-column-btn" 
          onClick={() => onDeleteColumn(status)}
          title="Delete Column"
        >
          &times;
        </button>
      </div>

      {/* Render all the task cards in this column */}
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}

      {/* Show a message if column is empty */}
      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#aaa', marginTop: '20px', fontSize: '13px' }}>
          No tasks here
        </p>
      )}
    </div>
  );
}

export default Column;
