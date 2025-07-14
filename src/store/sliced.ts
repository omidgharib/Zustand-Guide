import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Counter slice
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const createCounterSlice = (set: any) => ({
  count: 0,
  increment: () =>
    set(
      (state: CounterState) => ({ count: state.count + 1 }),
      false,
      'increment'
    ),
  decrement: () =>
    set(
      (state: CounterState) => ({ count: state.count - 1 }),
      false,
      'decrement'
    ),
});

// Todo slice
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const createTodoSlice = (set: any) => ({
  todos: [] as Todo[],
  addTodo: (text: string) =>
    set(
      (state: TodoState) => ({
        todos: [...state.todos, { id: Date.now(), text, completed: false }],
      }),
      false,
      'addTodo'
    ),

  toggleTodo: (id: number) =>
    set(
      (state: TodoState) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }),
      false,
      'toggleTodo'
    ),

  removeTodo: (id: number) =>
    set(
      (state: TodoState) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }),
      false,
      'removeTodo'
    ),
});

// Combined store type
type StoreState = CounterState & TodoState;

// Create root store combining slices with devtools
export const useStore = create<StoreState>()(
  devtools((set) => ({
    ...createCounterSlice(set),
    ...createTodoSlice(set),
  }))
);
