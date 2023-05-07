import Image from 'next/image';
import React from 'react';
import categoryImg01 from '../assets/category-01.png';
import categoryImg02 from '../assets/category-02.png';
import categoryImg03 from '../assets/category-03.png';
import categoryImg04 from '../assets/category-04.png';
import { useTranslation } from 'next-i18next';
const categoryData = [

  {
    display: 'Fast Food',
    imgUrl: categoryImg01,
  },
  {
    display: 'Pizza',
    imgUrl: categoryImg02,
  },

  {
    display: 'Asian Food',
    imgUrl: categoryImg03,
  },

  {
    display: 'Row meat',
    imgUrl: categoryImg04,
  },
];



const Category = () => {
  
  
  return (
    <div className='grid md:grid-cols-4 gap-10 my-10 3xl:my-16'>
      {categoryData.map((item, index) => (
        <div
          className='w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex justify-center items-center flex-col gap-3'
          key={index}
        >
          <Image src={item.imgUrl} alt='category__item' />
          <p className='font-normal'>{item.display}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
