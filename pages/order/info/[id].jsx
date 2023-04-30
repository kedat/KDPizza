import css from '../../../styles/Order.module.css';
import { client } from '../../../lib/client';
import { UilBill, UilBox, UilCancel } from '@iconscout/react-unicons';
import Image from 'next/image';
import Cooking from '../../../assets/cooking.png';
import onWay from '../../../assets/onway.png';
import Spinner from '../../../assets/spinner.svg';
import { useCallback, useEffect } from 'react';
import Layout from '../../../components/Layout/Layout';
import { cancelOrder } from '../../../lib/orderHandle';
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
  return (
    <Layout>
      <div className={`${css.container} md:pt-48 pt-24 `}>
        <span className={css.heading}>Order Information</span>
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
      </div>
    </Layout>
  );
};
export default Orders;