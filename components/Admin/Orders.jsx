import { isEmpty, map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCallback } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { client } from '../../lib/client';

const AllOrder = ({ orders }) => {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const onDeleteOrder = useCallback(
    async (id) => {
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
    },
    [router],
  );

  return (
    <div className='col-span-4'>
      <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className='table w-full text-center'>
          <thead>
            <tr>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>ID</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Name</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Phone</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Total</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Status</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Method</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Updated at</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(orders) &&
              map(orders, (order) => (
                <tr key={order._id}>
                  <td className='border px-8 py-4'>
                    <Link href={`./order/info/${order._id}`}>{order._id}</Link>
                  </td>
                  <td className='border px-8 py-4'>{order.name}</td>
                  <td className='border px-8 py-4'>{order.phone}</td>
                  <td className='border px-8 py-4'>{order.total}</td>
                  {order.status === 1 && <td className='border px-8 py-4'>Cooking</td>}
                  {order.status === 2 && <td className='border px-8 py-4'>On way</td>}
                  {order.status === 3 && <td className='border px-8 py-4'>Delivered</td>}
                  {order.status === 4 && <td className='border px-8 py-4'>Completed</td>}
                  {order.status === 5 && <td className='border px-8 py-4'>Canceled</td>}
                  <td className='border px-8 py-4'>{order.method === 0 ? 'Pay on Delivery' : 'Online Payment'}</td>
                  <td className='border px-8 py-4'>{order._updatedAt}</td>
                  <td className='border px-8 py-4'>
                    <Link href={`order/update/${order._id}`} className='hover:text-red-500'>
                      Update
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
                  {showConfirmModal && (
                    <div className='absolute z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-900 bg-opacity-5'>
                      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-md max-h-full'>
                        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                          <button
                            type='button'
                            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                            data-modal-hide='popup-modal'
                          >
                            <svg
                              aria-hidden='true'
                              className='w-5 h-5'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fillRule='evenodd'
                                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              ></path>
                            </svg>
                            <span className='sr-only'>Close modal</span>
                          </button>
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
                              onClick={() => {
                                onDeleteOrder(order._id);
                              }}
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

export default AllOrder;
