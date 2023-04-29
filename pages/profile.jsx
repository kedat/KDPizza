import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import ProfileSideBar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';
import Layout from '../components/Layout/Layout';
import { getAccountInfo } from '../lib/getAccountInfo';
import { client } from '../lib/client';

const ProfilePage = ({ orders, users }) => {
  const [userName, setUserName] = useState('');
  const [active, setActive] = useState(1);

  useEffect(() => {
    setUserName(typeof window !== 'undefined' && localStorage.getItem('username'));
  }, []);
  const userOrders = orders.filter((order) => {
    if (order.userName === userName) {
      return order;
    }
  });

  return (
    <Layout>
      <div className=' mx-auto bg-[#f5f5f5] py-10 grid grid-cols-5'>
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
