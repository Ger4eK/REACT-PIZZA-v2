import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярністю',
    sortProperty: 'rating',
  });
  console.log('sortType.sortProperty', sortType.sortProperty);

  useEffect(() => {
    setIsLoading(true);

      //! з властивості видали '-' якщо він буде 
    const sortBy = sortType.sortProperty.replace('-', '');
      //! провіряє чи в сортуванні є '-' і робить відповідні умови
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(
      `https://629facf58b939d3dc29d123b.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className='content__title'>Всі піци</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(10)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
