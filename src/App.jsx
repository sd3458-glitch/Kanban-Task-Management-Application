import React, { useState, useEffect } from 'react';
import './styles.css';
import Board from './components/Board';
import TaskForm from './components/TaskForm';

// This is the main App component
// We store tasks, columns, and theme in localStorage so they don't disappear on refresh

function App() {
  // --- STATE ---

  // 1. Theme state (light or dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kanban-theme') || 'light';
  });

  // 2. Columns state (default: Todo, In Progress, Done)
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('kanban-columns');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'todo', title: 'Todo' },
      { id: 'inprogress', title: 'In Progress' },
      { id: 'done', title: 'Done' }
    ];
  });

  // 3. Tasks state
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // --- USE EFFECTS (Saving to localStorage) ---
  useEffect(() => {
    localStorage.setItem('kanban-theme', theme);
    // Apply a class to the body for dark mode
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);


  // --- HANDLERS ---

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  function addColumn() {
    if (newColumnTitle.trim() === '') return;
    
    // Create a simple ID for the new column (lowercase, no spaces)
    const newId = newColumnTitle.trim().toLowerCase().replace(/\s+/g, '-');
    
    // Check if column already exists
    if (columns.find(col => col.id === newId)) {
      alert('A column with a similar name already exists!');
      return;
    }

    setColumns([...columns, { id: newId, title: newColumnTitle.trim() }]);
    setNewColumnTitle('');
  }

  function addTask(title, description, priority) {
    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      status: columns[0].id, // always put new tasks in the first column
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id, newTitle, newDescription, newPriority) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, title: newTitle, description: newDescription, priority: newPriority };
      }
      return task;
    }));
  }

  function moveTask(id, newStatus) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
  }

  function deleteColumn(columnId) {
    if (window.confirm('Are you sure you want to delete this column? All tasks inside will be deleted.')) {
      setTasks(tasks.filter(task => task.status !== columnId));
      setColumns(columns.filter(col => col.id !== columnId));
    }
  }

  // --- FILTERING ---
  
  // Filter the tasks before passing them to the board
  const filteredTasks = tasks.filter(task => {
    // Check search query
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
                          
    // Check priority filter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className={`app ${theme}`}>
      {/* Top Header */}
      <div className="header">
        <h1 className="app-title">📋 My Kanban Board</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      {/* Tools Section: Search, Filter, Add Column */}
      <div className="tools-bar">
        <input 
          type="text" 
          placeholder="🔍 Search tasks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="add-column-box">
          <input 
            type="text" 
            placeholder="New column name..." 
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
          <button onClick={addColumn}>Add Column</button>
        </div>
      </div>

      {/* Form to add new tasks */}
      <TaskForm onAddTask={addTask} />

      {/* The board component */}
      <Board
        columns={columns}
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
        onMoveTask={moveTask}
        onDeleteColumn={deleteColumn}
      />
    </div>
  );
}

export default App;
