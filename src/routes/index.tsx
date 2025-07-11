import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Articles from '@/pages/articles/pages';
import { Basic } from '@/pages/basic';
import Home from '@/pages/home/pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/basic"
        element={
          <PrivateRoute>
            <Basic />
          </PrivateRoute>
        }
      />
      <Route
        path="/articles"
        element={
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
