import React, { useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Layout from '../../components/Layout/Layout';
import { getAccountInfo } from '../../lib/getAccountInfo';
import { client } from '../../lib/client';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminContent from '../../components/Admin/AdminContent';

const ProfilePage = ({ orders, users, pizzas, categories, teas, asianFoods, drinks, hamburgers }) => {
  const router = useRouter();
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('isAdminLogin')) {
      router.push('/');
    }
  }, [router]);

  return (
    <Layout>
      <div className='mx-auto bg-[#f5f5f5] py-10 grid grid-cols-5 md:mt-48 mt-24 md:dark:mt-0 md:dark:pt-48 dark:pt-24 dark:mt-20 dark:bg-gray-900 '>
        <AdminSidebar active={active} setActive={setActive} />
        <AdminContent
          active={active}
          orders={orders}
          users={users}
          pizzas={pizzas}
          categories={categories}
          teas={teas}
          asianFoods={asianFoods}
          drinks={drinks}
          hamburgers={hamburgers}
        />
      </div>
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps = async () => {
  const orderQuery = '*[_type=="order"]';
  const orders = await client.fetch(orderQuery);
  const userQuery = '*[_type=="user"]';
  const users = await client.fetch(userQuery);
  const pizzaQuery = '*[_type=="pizza"]';
  const pizzas = await client.fetch(pizzaQuery);
  const categoryQuery = '*[_type=="category"]';
  const categories = await client.fetch(categoryQuery);
  const teaQuery = '*[_type=="tea"]';
  const teas = await client.fetch(teaQuery);
  const asianFoodQuery = '*[_type=="asianFood"]';
  const asianFoods = await client.fetch(asianFoodQuery);
  const drinkQuery = '*[_type=="drink"]';
  const drinks = await client.fetch(drinkQuery);
  const hamburgerQuery = '*[_type=="hamburger"]';
  const hamburgers = await client.fetch(hamburgerQuery);
  return {
    props: {
      orders,
      users,
      pizzas,
      categories,
      teas,
      asianFoods,
      drinks,
      hamburgers,
    },
  };
};
