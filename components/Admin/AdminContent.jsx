import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import AllOrder from './Order/Orders';
import AllUser from './User/Users';
import AllCategory from './Category/Categories';
import AllPizza from './Pizza/Pizzas';

const AdminContent = ({ active, orders, users, pizzas, categories }) => {
  return (
    <div className='col-span-4'>
      {active === 1 && <AllUser users={users} />}

      {active === 2 && <AllOrder orders={orders} />}

      {active === 3 && <AllCategory categories={categories} />}

      {active === 4 && <AllPizza pizzas={pizzas} categories={categories} />}
      <Toaster />
    </div>
  );
};

export default AdminContent;
