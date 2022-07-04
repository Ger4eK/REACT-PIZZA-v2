import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  const { items } = useSelector((state: RootState) => state.pizza);

  const currentHelper = (currentPage =
    0 || items.length === 0 ? 0 : currentPage);

  const pageCount = items.length === 4 ? 3 : 1 + currentHelper - 1;
  console.log(items);

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={(event) => {
        onChangePage(event.selected + 1);
      }}
      pageRangeDisplayed={4}
      pageCount={pageCount !== 0 ? pageCount : 1}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
