import React, { useState } from 'react';

const Categories = ({ value, onChangeCategory }) => {

  const categories = [
    'Всі',
    "М'ясні",
    'Вегетаріанська',
    'Гриль',
    'Гострі',
    'Закриті',
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={categoryName}
              onClick={() => {
                onChangeCategory(index);
              }}
              className={value === index ? 'active' : ''}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
