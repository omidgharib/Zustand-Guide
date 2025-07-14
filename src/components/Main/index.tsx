import Header from '../Header';
import Sidebar from '../Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

const Main = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">
          <Suspense fallback={<p>Loading ...</p>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Main;
