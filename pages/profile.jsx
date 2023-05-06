import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import ProfileSideBar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';
import Layout from '../components/Layout/Layout';
import { getAccountInfo } from '../lib/getAccountInfo';
import { client } from '../lib/client';
import { useRouter } from 'next/router';

const ProfilePage = ({ orders, users }) => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      router.push('/');
    }
    setUserName(typeof window !== 'undefined' && localStorage.getItem('username'));
  }, [router]);

  const userOrders = orders.filter((order) => {
    if (order.userName === userName) {
      return order;
    }
  });

  return (
    <Layout>
      <div className=' mx-auto bg-[#f5f5f5] py-10 grid grid-cols-5 md:mt-48 mt-24 md:dark:mt-0 md:dark:pt-48 dark:pt-24 dark:mt-20 dark:bg-gray-900 '>
        <ProfileSideBar active={active} setActive={setActive} />
        <ProfileContent active={active} userOrders={userOrders} users={users} />
      </div>
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps = async () => {
  const orderQuery = '*[_type=="order"]';
  const userQuery = '*[_type=="user"]';
  const orders = await client.fetch(orderQuery);
  const users = await client.fetch(userQuery);
  return {
    props: {
      orders,
      users,
    },
  };
};
