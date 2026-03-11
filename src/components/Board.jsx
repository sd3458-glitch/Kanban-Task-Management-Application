import React from 'react';
import Column from './Column';

// Board component - renders the columns dynamically
// We filter tasks by their status and pass them to the correct column

function Board({ columns, tasks, onDeleteTask, onEditTask, onMoveTask, onDeleteColumn }) {
  return (
    <div className="board">
      {/* Map over the columns array to create each column */}
      {columns.map(col => {
        // Find tasks that belong to this column
        const columnTasks = tasks.filter(task => task.status === col.id);
        
        return (
          <Column
            key={col.id}
            title={col.title}
            status={col.id}
            tasks={columnTasks}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onMoveTask={onMoveTask}
            onDeleteColumn={onDeleteColumn}
          />
        );
      })}
    </div>
  );
}

export default Board;
