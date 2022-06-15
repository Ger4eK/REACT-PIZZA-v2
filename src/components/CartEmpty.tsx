import { FC } from 'react';
import { Link } from 'react-router-dom';

import emptyCartImg from '../assets/img/empty-cart.png';

const CartEmpty: FC = () => {
  return (
    <>
      <div className='cart cart--empty'>
        <h2>
          Корзина порожня <span>😕</span>
        </h2>
        <p>
          Швидше за все, ви не добавили жодної піци в корзину 🤔
          <br />
          Для того, щоб додати найкращішу піцу ви Львові перейдіть на головну сторінку.
        </p>
        <img src={emptyCartImg} alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>На головну</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
