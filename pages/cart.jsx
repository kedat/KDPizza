import css from '../styles/Cart.module.css';
import Image from 'next/image';
import { urlFor } from '../lib/client';
import { useCallback, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import OrderModal from '../components/OrderModal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { removePizza } from '../store/cardSlice';
import Layout from '../components/Layout/Layout';
import { isEmpty, map } from 'lodash';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pizzas = useSelector((state) => state.cart.pizzas);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [order, setOrder] = useState(typeof window !== 'undefined' && localStorage.getItem('order'));
  const onHandleClickRemove = useCallback(
    (e) => {
      dispatch(removePizza(e.target.id));
      toast.error('Item removed');
    },
    [dispatch],
  );

  const total = useCallback(() => pizzas.reduce((a, b) => a + b.quantity * b.price, 0), [pizzas]);

  const onHandleDelivery = useCallback(() => {
    setPaymentMethod(0);
    typeof window !== 'undefined' && localStorage.setItem('total', total());
  }, [total]);

  const onHandleCheckout = useCallback(async () => {
    typeof window !== 'undefined' && localStorage.setItem('total', total());
    setPaymentMethod(1);
    const response = await fetch('api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pizzas),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading('Redirecting...');
    router.push(data.url);
  }, [pizzas, router, total]);

  return (
    <Layout>
      <div className='!flex flex-col md:grid !md:grid-cols-2 gap-10'>
        {/* detail */}

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <div className='flex items-center justify-between pb-4'>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='table-search'
                className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search for items'
              />
            </div>
          </div>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='table-header'>Pizza</th>
                <th className='table-header'>Name</th>
                <th className='table-header'>Size</th>
                <th className='table-header'>Price</th>
                <th className='table-header'>Quantity</th>
                <th className='table-header'>Total</th>
                <th className='table-header'>Action</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(pizzas) &&
                map(pizzas, (pizza, index) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={index} className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                      <td className='table-body'>
                        <Image
                          loader={() => src}
                          className='rounded-xl'
                          src={src}
                          alt='pizza'
                          objectFit='cover'
                          width={85}
                          height={85}
                        />
                      </td>
                      <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                        {pizza.name}
                      </td>
                      <td className='table-body'>
                        {pizza.size === 0 ? 'Small' : pizza.size === 1 ? 'Medium' : 'Larger'}
                      </td>
                      <td className='table-body'>{pizza.price}</td>
                      <td className='table-body'>{pizza.quantity}</td>
                      <td className='table-body'>{pizza.price * pizza.quantity}</td>
                      <td>
                        <button id={index} className='text-red-500' onClick={onHandleClickRemove}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{pizzas.length}</span>
            </div>
            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>
          {!order && pizzas.length > 0 ? (
            <div className={css.buttons}>
              <button className='btn' onClick={onHandleDelivery}>
                Pay on Delivery
              </button>
              <button className='btn' onClick={onHandleCheckout}>
                Pay now
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster />
      {/* Modal */}
      <OrderModal opened={paymentMethod === 0} paymentMethod={paymentMethod} setOpened={setPaymentMethod} />
    </Layout>
  );
};
export default Cart;
