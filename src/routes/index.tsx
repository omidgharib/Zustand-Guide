import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '@/components/Main';
import { Basic } from '@/pages/basic';
import { UserList } from '@/pages/users';
import { TodoList } from '@/pages/toDoList';
import { ShopingCart } from '@/pages/shopingCart';
import Home from '@/pages/home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Main />}>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/counter"
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
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
