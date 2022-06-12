import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <>
      <div class='cart cart--empty'>
        <h2>
          Корзина порожня <icon>😕</icon>
        </h2>
        <p>
          Швидше за все, ви не добавили жодної піци в корзину 🤔
          <br />
          Для того, щоб добавити найкращішу піцу ви Львові перейдіть на головну сторінку.
        </p>
        <img src={emptyCartImg} alt='Empty cart' />
        <Link to='/' class='button button--black'>
          <span>На головну</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
