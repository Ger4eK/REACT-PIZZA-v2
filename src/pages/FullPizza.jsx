import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://629facf58b939d3dc29d123b.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Помилка при отриманні піци!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className='container__full-pizza'>
        <h3>Завантаження...</h3>
      </div>
    );
  }

  return (
    <div className='container__full-pizza'>
      <div>
        <h2>{pizza.title}</h2>
        <img src={pizza.imageUrl} />
        <div>
          <Link to='/' class='button button--black'>
            <span>На головну</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
