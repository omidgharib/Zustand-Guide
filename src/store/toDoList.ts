import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  reorderTodos: (fromIndex: number, toIndex: number) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
            },
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      reorderTodos: (fromIndex, toIndex) =>
        set((state) => {
          const newTodos = [...state.todos];
          const [movedTodo] = newTodos.splice(fromIndex, 1);
          newTodos.splice(toIndex, 0, movedTodo);
          return { todos: newTodos };
        }),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
      //   partialize: (state) => ({ todos: state.todos }), // ✅ Only persist `todos`
    }
  )
);
