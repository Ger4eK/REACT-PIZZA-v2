import qs from 'qs';
import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort, { sortList } from '../components/Sort';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state: any) => state.pizza);
  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state: any) => state.filter
  );

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const getPizzas = async () => {
    // з властивості видали '-' якщо він буде
    const sortBy = sortType.sortProperty.replace('-', '');
    // провіряє чи в сортуванні є '-' і робить відповідні умови
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
  };

  //TODO Якщо змінили параметри і був перший рендер то буде ця провірка
  useEffect(() => {
    // якшо isMounted буде true (коли вже був перший рендер), то тільки тоді роби парсинг всіх параметрів
    if (isMounted.current) {
      // тут з'єднюєм
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      // вставляє queryString в наш URL
      navigate(`?${queryString}`);
    }
    // робиться для того шоб після першого рендера умова if (isMounted.current) спрацьовувала
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, navigate]);

  //TODO Якшо був перший рендер, то ми провіряємо URL-параметри і зберігаєм в редаксі
  useEffect(() => {
    // Якшо є параметри то ми їх парсимо (і вони будуть зберігатись для наступних таких перевірок)
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // Так як в наших params сорт в нас стрінга, а в редаксі в наc об'єкт, нам потрібно пробігтись по  масиву об'єктів (sortList) і найти саме той об'єкт в якого sortProperty відповідає sortProperty в стрінзі в params і вже той об'єкт ми будем передавати в редакс
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //TODO якщо був перший рендер, то робимо запит піци
  useEffect(() => {
    // Тут нам треба провіряти чи треба нам робити запит (тобто якшо прийшли параметри з (window.location.search) то тоді ми не будем відправляти стандартний запит, а чекаємо коли виконається dispatch(setFilters))

    // Тут якраз робитсья перевірка чи прийшли параметри, якшо нє то ми робимо стандартний запит
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [searchValue, categoryId, sortType, currentPage]);

  //! тимчасово
  const pizzasData = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Всі піци</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Упс, сталася помилка 💀...💀</h2>
          <p>
            На жаль піци не захотіли вам показуватись. Попробуйте
            перезавантажити ↻ сторінку)
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeletons : pizzasData}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
