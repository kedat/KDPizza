import css from '../../styles/Order.module.css';
import { client } from '../../lib/client';
import { UilBill, UilBox, UilCancel } from '@iconscout/react-unicons';
import Image from 'next/image';
import Cooking from '../../assets/cooking.png';
import onWay from '../../assets/onway.png';
import Spinner from '../../assets/spinner.svg';
import { useCallback, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { cancelOrder } from '../../lib/orderHandle';
import { toast, Toaster } from 'react-hot-toast';

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
  useEffect(() => {
    if (order.status > 3) {
      localStorage.removeItem('order');
    }
  }, [order]);

  const onCancelOrder = useCallback(async () => {
    console.log(order);
    // const id = await cancelOrder({ ...order });
    // const doc = {
    //   _id: order._id,
    //   _type: 'order',
    //   name: 'order.name',
    //   status: 5,
    // };
    // console.log('🚀 ~ file: [id].jsx:38 ~ onCancelOrder ~ doc:', doc);

    // client.createOrReplace(doc).then((res) => {
    //   console.log(`Bike was created, document ID is ${res._id}`);
    // });
    client
      .patch(order._id)
      .inc({ status: 5 }) // Increment `price` by 88, `numSales` by 1
      .commit();
    toast.success('Canceled');
  }, [order]);

  return (
    <Layout>
      <div className={css.container}>
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
              <span className={css.pending}> On Delivery</span>
            ) : (
              <span className={css.completed}>Completed</span>
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

            {order.status > 1 && <span className={css.completed}>Completed</span>}
          </div>

          <div className={css.status}>
            <Image src={onWay} alt='On the Way' width={50} height={50} />
            <span className='-mx-1'>On way</span>
            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt='Spinner' />
              </div>
            )}
            {order.status > 2 && <span className={css.completed}>Completed</span>}
          </div>

          <div className={css.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt='Spinner' />
              </div>
            )}
            {order.status > 3 && <span className={css.completed}>Completed</span>}
          </div>
        </div>
        <div className='flex justify-end bg-red-500 text-white px-4 py-2 rounded-md'>
          <button className='flex items-center gap-1' onClick={onCancelOrder}>
            <UilCancel width={20} height={20} />
            Cancel this order
          </button>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};
export default Orders;
