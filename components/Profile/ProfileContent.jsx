import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import { getAccountInfo } from '../../lib/getAccountInfo';
import AllOrder from './Order';
import Profile from './Profile';
import ChangePassword from './ChangePassword';

const ProfileContent = ({ active, userOrders, users }) => {
  return (
    <div className='col-span-4'>
      {/* profile */}
      {active === 1 && <Profile />}

      {/* order */}
      {active === 2 && <AllOrder userOrders={userOrders} />}

      {/* order */}
      {active === 3 && <ChangePassword />}
      <Toaster />
    </div>
  );
};

export default ProfileContent;
