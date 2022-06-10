import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);

  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns='http://www.w3.org/2000/svg'
        enable-background='new 0 0 32 32'
        id='Editable-line'
        version='1.1'
        viewBox='0 0 32 32'
      >
        <circle
          cx='14'
          cy='14'
          fill='none'
          id='XMLID_42_'
          r='9'
          stroke='#000000'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-miterlimit='10'
          stroke-width='2'
        />
        <line
          fill='none'
          id='XMLID_44_'
          stroke='#000000'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-miterlimit='10'
          stroke-width='2'
          x1='27'
          x2='20.366'
          y1='27'
          y2='20.366'
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Пошук піци...'
      />

      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          xmlns='http://www.w3.org/2000/svg'
          data-name='Livello 1'
          id='Livello_1'
          viewBox='0 0 128 128'
        >
          <title />
          <path d='M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z' />
          <path d='M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z' />
        </svg>
      )}
    </div>
  );
};

export default Search;
