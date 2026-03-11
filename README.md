# Kanban Task Management Application

A clean, beginner-friendly single-page web application to manage tasks using a Kanban-style board. 

## Features

*   **Custom Columns**: Add new workflow stages (like "Review" or "Testing") dynamically.
*   **Task Creation & Editing**: Create tasks with titles, descriptions, and priority levels. Edit them inline.
*   **Drag and Drop**: Seamlessly move tasks between different columns to update their status.
*   **Priority Flags**: Assign "High", "Medium", or "Low" priority to tasks, complete with color-coded badges.
*   **Search and Filter**: Instantly find tasks using the text search bar, or filter the board by priority level.
*   **State Persistence**: All data (tasks, custom columns, and theme preference) is saved securely in your browser's local storage so it survives page refreshes.
*   **Dark Mode**: Built-in toggle to switch the entire application between light and dark themes.
*   **Responsive Layout**: Designed to work beautifully on both desktop screens and mobile devices.

## Technologies Used

*   **React (with Vite)**: For the core component architecture and fast development server.
*   **Vanilla CSS**: Simple and highly readable custom styling for everything from the layout grid to dark mode overrides.
*   **Local Storage**: For client-side data persistence without the need for a backend database.

## Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── Board.jsx       # Maps and displays all columns
│   ├── Column.jsx      # Individual columns, handles drag-and-drop zones
│   ├── TaskCard.jsx    # Sticky-note style tasks with inline editing
│   └── TaskForm.jsx    # Form to create new tasks and set priorities
├── App.jsx             # Main application state and filtering logic
├── main.jsx            # React entry point
└── styles.css          # All styling, including responsive design and dark theme
```

## How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173/`.

## Deployment

This project is built with Vite and is ready for easy deployment to Vercel or Netlify.
Just connect your repository and use the standard build configuration:
*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist`
