import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>()(
  devtools((set) => ({
    count: 0,
    increment: () =>
      set((state) => ({ count: state.count + 1 }), false, 'increment'),
    decrement: () =>
      set((state) => ({ count: state.count - 1 }), false, 'decrement'),
  }))
);

export default useCounterStore;
