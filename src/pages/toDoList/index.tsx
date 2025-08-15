import React, { useState, useRef, useEffect } from 'react';
import { useTodoStore } from '@/store/toDoList';
import styles from './TodoList.module.css';

export const TodoList: React.FC = () => {
  const [text, setText] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { todos, addTodo, toggleTodo, removeTodo, reorderTodos } =
    useTodoStore();
  const dragRef = useRef<HTMLLIElement>(null);

  const handleAdd = () => {
    if (text.trim()) {
      setIsAdding(true);
      addTodo(text);
      setText('');
      // Reset animation state after animation completes
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', id);

    // Add dragging class to the dragged element
    if (dragRef.current) {
      dragRef.current.style.opacity = '0.5';
    }
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/html');

    if (draggedId && draggedId !== targetId) {
      const fromIndex = todos.findIndex((todo) => todo.id === draggedId);
      const toIndex = todos.findIndex((todo) => todo.id === targetId);

      if (fromIndex !== -1 && toIndex !== -1) {
        reorderTodos(fromIndex, toIndex);
      }
    }

    setDraggedId(null);
    setDragOverId(null);

    // Reset dragging styles
    if (dragRef.current) {
      dragRef.current.style.opacity = '1';
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);

    // Reset dragging styles
    if (dragRef.current) {
      dragRef.current.style.opacity = '1';
    }
  };

  const handleRemove = (id: string) => {
    setRemovingId(id);
    // Delay the actual removal to allow for animation
    setTimeout(() => {
      removeTodo(id);
      setRemovingId(null);
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Todo List
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
            onDragOver={(e) => handleDragOver(e, todo.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, todo.id)}
            onDragEnd={handleDragEnd}
            ref={draggedId === todo.id ? dragRef : null}
            className={`
              ${styles.todoItem}
              ${draggedId === todo.id ? styles.dragging : ''}
              ${dragOverId === todo.id && draggedId !== todo.id ? styles.dragOver : ''}
              ${removingId === todo.id ? styles.removing : ''}
              ${isAdding && index === todos.length - 1 ? styles.adding : ''}
            `}
          >
            <div className="flex items-center flex-1">
              <div className={styles.dragHandle}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span
                className={`${styles.todoText} ${
                  todo.completed ? styles.completed : ''
                }`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleRemove(todo.id)}
              className={styles.deleteButton}
              aria-label="Delete todo"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
};

export default TodoList;
