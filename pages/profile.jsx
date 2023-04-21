import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import ProfileSideBar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';
import Layout from '../components/Layout/Layout';
import { getAccountInfo } from '../lib/getAccountInfo';
import { client } from '../lib/client';

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <Layout>
      <div className=' mx-auto bg-[#f5f5f5] py-10 grid grid-cols-5'>
        <ProfileSideBar active={active} setActive={setActive} />
        <ProfileContent active={active} />
      </div>
    </Layout>
  );
};

export default ProfilePage;

