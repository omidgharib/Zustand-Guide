import useCounterStore from '@/store/counter';

export const Basic = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Zustand Counter</h1>

      <p className="text-2xl text-gray-700">
        Count: <span className="font-mono">{count}</span>
      </p>

      <div className="flex space-x-4">
        <button
          onClick={increment}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          aria-label="Increment count"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          aria-label="Decrement count"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};
