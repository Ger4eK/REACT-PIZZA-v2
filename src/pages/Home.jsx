import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';
import { setCategoryId, setSortType } from '../redux/slices/filterSlice';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    //! з властивості видали '-' якщо він буде
    const sortBy = sortType.sortProperty.replace('-', '');
    //! провіряє чи в сортуванні є '-' і робить відповідні умови
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://629facf58b939d3dc29d123b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [searchValue, categoryId, sortType, currentPage]);

  const pizzasData = pizzas.map((pizza) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(10)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Всі піци</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzasData}</div>
      <Pagination onChangePage={setCurrentPage} />
    </div>
  );
};

export default Home;
