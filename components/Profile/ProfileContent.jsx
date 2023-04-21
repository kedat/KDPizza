import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import { getAccountInfo } from '../../lib/getAccountInfo';
import AllOrder from './Order';
import Profile from './Profile';

const ProfileContent = ({ active }) => {
  return (
    <div className='col-span-4'>
      {/* profile */}
      {active === 1 && <Profile />}

      {/* order */}
      {active === 2 && <AllOrder />}
      <Toaster />
    </div>
  );
};

export default ProfileContent;
