import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Router from './routes';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PWAStatus from './components/PWAStatus';
import PWAInstallGuide from './components/PWAInstallGuide';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <div className="App font-mono h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto bg-gray-50"> */}
      <Router />
      {/* </main>
        </div>
      </div> */}
      <PWAStatus />
      <PWAInstallPrompt />
      <PWAInstallGuide />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
