import React, { useState } from 'react';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    'Всі',
    "М'ясні",
    'Вегетаріанська',
    'Гриль',
    'Гострі',
    'Закриті',
  ];

  const onClickCategory = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={category}
              onClick={() => {
                onClickCategory(index);
              }}
              className={activeCategory === index ? 'active' : ''}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
