import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart'));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza"*/'./pages/FullPizza'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound"*/'./pages/NotFound'));

function App() {
  return ( 
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='cart'
          element={
            <Suspense fallback={<div>Завантажуємо корзину...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<div>Завантажуємо піцоні...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Завантажуємооо...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
