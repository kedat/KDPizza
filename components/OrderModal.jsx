import css from '../styles/OpenModal.module.css';
import { useMantineTheme, Modal } from '@mantine/core';
import { useCallback, useState } from 'react';
import { createOrder } from '../lib/orderHandle';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { resetCart } from '../store/cardSlice';
import { useDispatch } from 'react-redux';

const OrderModal = ({ opened = false, setOpened, paymentMethod, pizzas }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useMantineTheme();
  const [formData, setFormData] = useState({});
  const total = typeof window !== 'undefined' && localStorage.getItem('total');
  const userName = typeof window !== 'undefined' && localStorage.getItem('username');
  const handleInputChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const payload = { ...formData, total, paymentMethod, userName, pizzas };
      const id = await createOrder(payload);
      toast.success('Order Placed');
      dispatch(resetCart());
      {
        typeof window !== 'undefined' && localStorage.setItem('order', id);
      }
      router.push(`/order/${id}`);
    },
    [formData, total, paymentMethod, userName, pizzas, dispatch, router],
  );

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input type='text' name='name' required placeholder='Name' onChange={handleInputChange} />
        <input type='number' name='phone' required placeholder='Phone number' onChange={handleInputChange} />
        <textarea name='address' rows={3} placeholder='Address' onChange={handleInputChange}></textarea>
        <span>
          You will pay <span className='font-bold text-red-500 text-[1.3rem]'>${total}</span> on delivery
        </span>
        <button type='submit' className='btn'>
          Place order
        </button>
      </form>
    </Modal>
  );
};
export default OrderModal;
