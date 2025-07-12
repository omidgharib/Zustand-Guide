import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Articles from '@/pages/articles/pages';
import { Basic } from '@/pages/basic';
import { UserList } from '@/pages/users';
import { TodoList } from '@/pages/toDoList';
import { ShopingCart } from '@/pages/shopingCart';
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
        path="/users" // async action
        element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        }
      />
      <Route
        path="/todo-list" // async action
        element={
          <PrivateRoute>
            <TodoList />
          </PrivateRoute>
        }
      />
      <Route
        path="/shoping-cart" // computed-state
        element={
          <PrivateRoute>
            <ShopingCart />
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
