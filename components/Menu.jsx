import css from '../styles/Menu.module.css';
import Image from 'next/image';
import { urlFor } from '../lib/client';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const Menu = ({ pizzas, categories, hamburgers, teas, drinks, asianFoods }) => {
  const [category, setCategory] = useState(0);
  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);
  const allFood = pizzas.concat(hamburgers, teas, drinks, asianFoods);
  const newPizzas = allFood.filter((item) => {
    if (item.categoryId == category) {
      return item;
    }
  });

  return (
    <div className={css.container}>
      <div className={css.heading}>
        <span className='text-red-500 text-[1rem] mb-[2rem] -mt-20'>OUR MENU</span>
        <span className='text-[2rem]'>Menu That Always</span>
        <span className='text-[2rem]'>Make you Fall in Love</span>
      </div>

      <select
        className='text-black w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500'
        onChange={onChangeCategory}
      >
        <option value={0}>All</option>
        {categories.length > 0 &&
          categories.map((category, id) => {
            return (
              <option value={category.id} key={category.id} className='py-1'>
                {category.name}
              </option>
            );
          })}
      </select>

      <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 mx-auto gap-20 max-h-[1000px] overflow-y-scroll overflow-x-hidden md:grid-cols-2 grid-cols-1'>
        {newPizzas.length > 0
          ? newPizzas.map((pizza, id) => {
            const src = urlFor(pizza.image).url();
            return (
              <div className={`${css.pizza}`} key={id}>
                <Link href={`./${pizza._type}/${pizza.slug.current}`}>
                  <div className={css.ImageWrapper}>
                    <Image
                      loader={() => src}
                      src={src}
                      alt='pizza'
                      objectFit='cover'
                      layout='fill'
                      className='hover:scale-[1.1] hover:cursor-pointer'
                    />
                  </div>
                </Link>
                <span>{pizza.name}</span>
                <span>
                  <span className='text-red-500'>$</span> {pizza.price[1]}
                </span>
              </div>
            );
          })
          : allFood.map((pizza, id) => {
            const src = urlFor(pizza.image).url();
            return (
              <div className={`${css.pizza}`} key={id}>
                <Link href={`./${pizza._type}/${pizza.slug.current}`}>
                  <div className={css.ImageWrapper}>
                    <Image
                      loader={() => src}
                      src={src}
                      alt='pizza'
                      objectFit='cover'
                      layout='fill'
                      className='hover:scale-[1.1] hover:cursor-pointer'
                      unoptimized
                    />
                  </div>
                </Link>
                <span>{pizza.name}</span>
                <span>
                  <span className='text-red-500'>$</span> {pizza.price[1]}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Menu;
