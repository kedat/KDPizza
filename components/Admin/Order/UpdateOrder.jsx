import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty, map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import { client } from '../../../lib/client';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import Loading from '../../common/Loading';
import { useState } from 'react';

const UpdateOrderComponent = ({ order }) => {
  const { name, phone, status, address, userName, total, _id } = order;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required(),
    status: yup.number().required(),
    phone: yup.number().required(),
    address: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data) => {
      const { name, status, phone, address } = data;
      setLoading(true);
      await client
        .patch(_id) // Document ID to patch
        .set({ name, status, phone: String(phone), address })
        .commit()
        .then((updatedOrder) => {
          router.push('/admin');
          toast.success('Update order successfully');
          setLoading(false);
          console.log(updatedOrder);
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message);
        });
    },
    [_id, router],
  );

  return (
    <form className='md:pt-40' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='floating_name'
            id='floating_name'
            className='block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            defaultValue={name}
            required
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
          <label
            htmlFor='floating_name'
            className='peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Name
          </label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='floating_userName'
            id='floating_userName'
            className='block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            value={userName}
            disabled
          />
          <p>{errors.userName?.message}</p>
          <label
            htmlFor='floating_userName'
            className='peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            User Name
          </label>
        </div>
      </div>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='number'
            name='floating_total'
            id='floating_total'
            className='block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            disabled
            defaultValue={total}
          />
          <label
            htmlFor='floating_total'
            className='peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Order total
          </label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <label
            htmlFor='underline_select'
            className='peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Status
          </label>
          <select
            id='underline_select'
            className='block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
            {...register('status')}
            defaultValue={status}
          >
            <option value='1' className='dark:text-black'>
              Cooking
            </option>
            <option value='2' className='dark:text-black'>
              On way
            </option>
            <option value='3' className='dark:text-black'>
              Delivered
            </option>
            <option value='4' className='dark:text-black'>
              Completed
            </option>
          </select>
        </div>
      </div>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='number'
            name='floating_phone'
            id='floating_phone'
            className='block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            defaultValue={phone}
            required
            {...register('phone')}
          />
          <p>{errors.phone?.message}</p>
          <label
            htmlFor='floating_phone'
            className='peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Phone
          </label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='floating_address'
            id='floating_address'
            className='block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            defaultValue={address}
            {...register('address')}
            required
          />
          <p>{errors.address?.message}</p>
          <label
            htmlFor='floating_address'
            className='peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Address
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        {loading ? <Loading /> : 'Update'}
      </button>
      <Toaster />
    </form>
  );
};

export default UpdateOrderComponent;
