import {
  UilUser,
  UilKeySkeleton,
  UilTransaction,
  UilArchive,
  UilPizzaSlice,
  UilCoffee,
  UilGlass,
  UilBrain,
  UilRestaurant,
} from '@iconscout/react-unicons';
const AdminSidebar = ({ setActive, active }) => {
  return (
    <div className='pl-3'>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(1)}>
        <UilUser size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 1 ? 'text-red-600' : ''} hidden md:block `}>Users</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(2)}>
        <UilTransaction size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 2 ? 'text-red-600' : ''} hidden md:block `}>Orders</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(3)}>
        <UilArchive size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 3 ? 'text-red-600' : ''} hidden md:block `}>Categories</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(4)}>
        <UilPizzaSlice size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 4 ? 'text-red-600' : ''} hidden md:block `}>Pizzas</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(5)}>
        <UilCoffee size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 5 ? 'text-red-600' : ''} hidden md:block `}>Teas</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(6)}>
        <UilGlass size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 6 ? 'text-red-600' : ''} hidden md:block `}>Drinks</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(7)}>
        <UilRestaurant size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 7 ? 'text-red-600' : ''} hidden md:block `}>Asian food</span>
      </div>
      <div className='flex items-center cursor-pointer w-full mb-8' onClick={() => setActive(8)}>
        <UilBrain size={25} className='dark:text-gray-300 text-[#2E2E2E]' />
        <span className={`pl-3 ${active === 8 ? 'text-red-600' : ''} hidden md:block `}>Hamburger</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
