import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import { getAccountInfo } from '../../lib/getAccountInfo';
import { useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Loading from '../common/Loading';

const ChangePassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const getUser = useCallback(async () => {
    try {
      const userId = typeof window !== 'undefined' && localStorage.getItem('userId');
      const { documents } = await getAccountInfo(userId);
      await setUser(documents[0]);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [setUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const schema = yup.object().shape({
    password: yup.string().min(1).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords Don't Match")
      .required(),
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
      setLoading(true);
      await client
        .patch(user._id) // Document ID to patch
        .set({ password: data.password }) // Shallow merge
        .commit() // Perform the patch and return a promise
        .then(() => {
          toast.success('Updated');
          router.push('/');
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message);
        });
      setLoading(false);
    },
    [router, user?._id],
  );

  return (
    <div className='w-full px-5 md:border md:py-5 md:rounded-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Current Password
          </label>
          <input
            type='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={user && user.password}
            disabled
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            New Password
          </label>
          <input
            type='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            {...register('password')}
          />
          <p className='mt-1 text-red-600'>{errors.password?.message}</p>
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Confirm New Password
          </label>
          <input
            type='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            {...register('confirmPassword')}
          />
          <p className='mt-1 text-red-600'>{errors.confirmPassword?.message}</p>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          {loading ? <Loading /> : 'Update password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
