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
  const isLogin = typeof window !== 'undefined' && localStorage.getItem('username');
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
      <div className='!flex flex-col md:grid !md:grid-cols-2 gap-10 md:pt-48 pt-24 '>
        {/* detail */}

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] overflow-y-auto'>
          <table className='w-full text-sm text-gray-500 text-center '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
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
                    <tr key={index} className=' border-b dark:bg-gray-900 dark:border-gray-700 text-center'>
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
                      <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{pizza.name}</td>
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
          {!order && isLogin && pizzas.length > 0 ? (
            <div className={css.buttons}>
              <button className='btn dark:!text-gray-300' onClick={onHandleDelivery}>
                Pay on Delivery
              </button>
              <button className='btn' onClick={onHandleCheckout}>
                Pay now
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Toaster />
      {/* Modal */}
      <OrderModal opened={paymentMethod === 0} paymentMethod={paymentMethod} setOpened={setPaymentMethod} />
    </Layout>
  );
};
export default Cart;
