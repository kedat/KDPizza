import React from 'react';
import {
  UilShoppingBag,
  UilReceipt,
  UilUser,
  UilSetting,
  UilSignout,
  UilShoppingCart,
  UilKeySkeleton,
  UilSignOutAlt,
} from '@iconscout/react-unicons';
const ProfileSidebar = ({ setActive, active }) => {
  return (
    <div className='pl-3'>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(1)}>
        <UilUser size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 1 ? 'text-red-600' : ''} hidden md:block `}>Profile</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(2)}>
        <UilShoppingCart size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 2 ? 'text-red-600' : ''} hidden md:block `}>Orders</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(3)}>
        <UilKeySkeleton size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 3 ? 'text-red-600' : ''} hidden md:block `}>Change password</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
