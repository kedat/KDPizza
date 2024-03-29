import { filter, find, isEmpty, map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { client } from '../../../lib/client';

const AllDrink = ({ drinks, categories }) => {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [id, setId] = useState('');

  const onDeleteTea = useCallback(async () => {
    await client
      .delete(id)
      .then(() => {
        setShowConfirmModal(false);
        toast.success('Delete successfully');
        router.push('/admin');
      })
      .catch((err) => {
        console.error('Delete failed: ', err.message);
      });
  }, [id, router]);
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
            {!isEmpty(drinks) &&
              map(drinks, (drink) => (
                <tr key={drink._id}>
                  <td className='border px-8 py-4'>{drink.name.slice(0, 20)}</td>
                  <td className='border px-8 py-4'>{drink.details?.slice(0, 20)}...</td>
                  <td className='border px-8 py-4'>{drink.categoryId}</td>
                  <td className='border px-8 py-4'>{map(drink.price, (price) => price).join(', ')}</td>
                  <td className='border px-8 py-4'>
                    <Link href={`admin/drink/update/${drink._id}`}>
                      <span className='hover:text-red-500 cursor-pointer'>Update </span>
                    </Link>
                    <button
                      className='hover:text-red-500'
                      onClick={() => {
                        setShowConfirmModal(true);
                        setId(drink._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  {showConfirmModal && (
                    <div className='absolute z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-900 bg-opacity-20'>
                      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-md max-h-full'>
                        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                          <div className='p-6 text-center'>
                            <svg
                              aria-hidden='true'
                              className='mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                              ></path>
                            </svg>
                            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Delete</h3>
                            <button
                              data-modal-hide='popup-modal'
                              type='button'
                              className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                              onClick={onDeleteTea}
                            >
                              Yes, Im sure
                            </button>
                            <button
                              data-modal-hide='popup-modal'
                              onClick={() => setShowConfirmModal(false)}
                              type='button'
                              className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                            >
                              No, cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default AllDrink;
