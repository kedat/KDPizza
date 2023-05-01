import { isEmpty, map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { client } from '../../lib/client';

const AllPizza = ({ pizzas }) => {
  const router = useRouter();

  return (
    <div className='col-span-4'>
      <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className='table w-full text-center'>
          <thead>
            <tr>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Name</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Detail</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Category</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Price</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(pizzas) &&
              map(pizzas, (pizza) => (
                <tr key={pizza._id}>
                  <td className='border px-8 py-4'>
                    <Link href={`./pizza/info/${pizza._id}`}>{pizza.name.slice(0, 20)}</Link>
                  </td>
                  <td className='border px-8 py-4'>{pizza.details.slice(0, 20)}...</td>
                  <td className='border px-8 py-4'>{pizza.categoryId}</td>
                  <td className='border px-8 py-4'>{pizza.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td className='border px-8 py-4'>
                    <Link href={`pizza/update/${pizza._id}`}>
                      <span className='hover:text-red-500 cursor-pointer'>Update</span>
                    </Link>
                    <button
                      className='ml-3 hover:text-red-500'
                      onClick={() => {
                        setShowConfirmModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button
        className='relative inline-flex items-center justify-end p-0.5 mt-5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
        onClick={() => {
          router.push('admin/pizza/add');
        }}
      >
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
          Add new
        </span>
      </button>
      <Toaster />
    </div>
  );
};

export default AllPizza;
