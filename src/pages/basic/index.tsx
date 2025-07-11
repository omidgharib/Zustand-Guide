import useCounterStore from '@/store/counter';

export const Basic = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Zustand Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
