import css from '../../styles/Order.module.css';
import { client } from '../../lib/client';
import { UilBill, UilBox, UilCancel } from '@iconscout/react-unicons';
import Image from 'next/image';
import Cooking from '../../assets/cooking.png';
import onWay from '../../assets/onway.png';
import Spinner from '../../assets/spinner.svg';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { cancelOrder } from '../../lib/orderHandle';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='order' && _id=='${params.id}']`;
  const order = await client.fetch(query);
  return {
    props: {
      order: order[0],
    },
  };
};
const Orders = ({ order }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (order.status > 3) {
      localStorage.removeItem('order');
    }
  }, [order]);

  const onCancelOrder = useCallback(async () => {
    client.patch(order._id).inc({ status: 4 }).commit();
    toast.success('Canceled');
    localStorage.removeItem('order');
    router.push('/');
  }, [order, router]);

  return (
    <Layout>
      <div className={`${css.container} md:pt-48 pt-24 `}>
        <span className={css.heading}>Order in Process</span>
        <div className={css.details}>
          <div className='flex md:flex-row flex-col'>
            <span>Order ID</span>
            <span>{order._id}</span>
          </div>
          <div className='flex md:flex-row flex-col'>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>
          <div className='flex md:flex-row flex-col'>
            <span>Customer Phone</span>
            <span>{order.phone}</span>
          </div>
          <div className='flex md:flex-row flex-col'>
            <span>Method</span>
            <span>{order.method === 0 ? 'Cash on Delivery' : 'Online Payment(Paid)'}</span>
          </div>
          <div className='flex md:flex-row flex-col'>
            <span>Total</span>
            <span>$ {order.total}</span>
          </div>
        </div>
        <div className={`${css.statusContainer} flex md:flex-row flex-col !gap-28`}>
          <div className={css.status}>
            <UilBill width={50} height={50} />
            <span>Payment</span>
            {order.method === 0 ? (
              <span className='inline-flex items-center bg-yellow-300 text-green-800 text-base font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-yellow-300'>
                <span className='w-3 h-3 mr-1 bg-green-500 rounded-full'></span>
                Delivered
              </span>
            ) : (
              <span className='inline-flex items-center bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-green-900 dark:text-green-300'>
                <span className='w-3 h-3 mr-1 bg-green-500 rounded-full'></span>
                Completed
              </span>
            )}
          </div>

          <div className={css.status}>
            <Image src={Cooking} alt='Cooking' width={50} height={50} />
            <span>Cooking</span>
            {order.status === 1 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt='Spinner' />
              </div>
            )}

            {order.status > 1 && (
              <span className='inline-flex items-center bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-green-900 dark:text-green-300'>
                <span className='w-3 h-3 mr-1 bg-green-500 rounded-full'></span>
                Completed
              </span>
            )}
          </div>

          <div className={css.status}>
            <Image src={onWay} alt='On the Way' width={50} height={50} />
            <span className='-mx-1'>On way</span>
            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt='Spinner' />
              </div>
            )}
            {order.status > 2 && (
              <span className='inline-flex items-center bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-green-900 dark:text-green-300'>
                <span className='w-3 h-3 mr-1 bg-green-500 rounded-full'></span>
                Completed
              </span>
            )}
          </div>

          <div className={css.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt='Spinner' />
              </div>
            )}
            {order.status === 4 && (
              <span className='inline-flex items-center bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-green-900 dark:text-green-300'>
                <span className='w-3 h-3 mr-1 bg-green-500 rounded-full'></span>
                Completed
              </span>
            )}
          </div>
        </div>
        <div
          className={`flex justify-end bg-red-500 text-white px-4 py-2 rounded-md ${
            order.status > 2 && 'pointer-events-none opacity-50'
          }`}
        >
          <button
            className='flex items-center gap-1'
            onClick={() => {
              setShowConfirmModal(true);
            }}
          >
            <UilCancel width={20} height={20} />
            Cancel this order
          </button>
        </div>
      </div>
      {showConfirmModal && (
        <div className='absolute z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-900 bg-opacity-50'>
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
                  onClick={onCancelOrder}
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
      <Toaster />
    </Layout>
  );
};
export default Orders;
