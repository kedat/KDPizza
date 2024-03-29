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

const AddCategoryComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = yup.object().shape({
    categoryName: yup.string().required(),
    id: yup.string().required(),
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
      const doc = {
        _type: 'category',
        id: Number(data.id),
        name: data.categoryName,
      };
      await client.create(doc).then((res) => {
        router.push('/admin');
        toast.success('Add category successfully');
        setLoading(false);
      });
    },
    [router],
  );

  return (
    <form className='md:pt-40' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='number'
            name='floating_id'
            id='floating_id'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            {...register('id')}
          />
          <p>{errors.id?.message}</p>
          <label
            htmlFor='floating_id'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Category ID
          </label>
        </div>
        <div className='relative z-0 w-full mb-6 group'>
          <input
            type='text'
            name='floating_name'
            id='floating_name'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            {...register('categoryName')}
            required
          />
          <p>{errors.categoryName?.message}</p>
          <label
            htmlFor='floating_name'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Category name
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        {loading ? <Loading /> : 'Add'}
      </button>
      <Toaster />
    </form>
  );
};

export default AddCategoryComponent;
