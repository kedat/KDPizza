import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import AllOrder from './Order/Orders';
import AllUser from './User/Users';
import AllCategory from './Category/Categories';
import AllPizza from './Pizza/Pizzas';
import AllTea from './Tea/Tea';
import AllDrink from './Drink/Drink';
import AllAsianFood from './AsianFood/AsianFood';
import AllHamburger from './Hamburger/Hamburger';

const AdminContent = ({ active, orders, users, pizzas, categories, teas, asianFoods, drinks, hamburgers }) => {
  return (
    <div className='col-span-4'>
      {active === 1 && <AllUser users={users} />}

      {active === 2 && <AllOrder orders={orders} />}

      {active === 3 && <AllCategory categories={categories} />}

      {active === 4 && <AllPizza pizzas={pizzas} categories={categories} />}

      {active === 5 && <AllTea teas={teas} categories={categories} />}

      {active === 6 && <AllDrink drinks={drinks} categories={categories} />}

      {active === 7 && <AllAsianFood asianFoods={asianFoods} categories={categories} />}

      {active === 8 && <AllHamburger hamburgers={hamburgers} categories={categories} />}
      <Toaster />
    </div>
  );
};

export default AdminContent;
