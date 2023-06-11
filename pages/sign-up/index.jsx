import React, { useCallback, useState } from 'react';
import back from '../../assets/my-account.jpg';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../store/authSlice';
import Image from 'next/image';
import { useWindowSize } from '../../lib/hooks';
import { useRouter } from 'next/router';
import { client } from '../../lib/client';
import Link from 'next/link';
import { createAccount } from '../../lib/createAccount';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, Toaster } from 'react-hot-toast';
import LoadingIcon from '../../assets/icon/loading.svg';
import Loading from '../../components/common/Loading';

const SignUp = ({ users }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useWindowSize().width < 768;
  const [loading, setLoading] = useState(false);
  const [existsUser, setExistsUser] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required('Your Full Name is Required!'),
    email: yup.string().email().required(),
    phone: yup.number().required(),
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
      const existsUser = users.filter((user) => {
        if (user.name === data.username) {
          return user;
        }
      });
      if (existsUser.length > 0) {
        setExistsUser(true);
        setLoading(false);
      } else {
        const id = await createAccount(data);
        if (id) {
          setLoading(false);
        }
        toast.success('Account created');
        router.push('login');
      }
    },
    [router, users],
  );

  return (
    <section className=' md:px-14 px-3 bg-white dark:bg-gray-900'>
      <Image src={back} alt='' height={mobile ? 800 : 500} />
      <form
        className='border border-1 flex flex-col md:my-10 my-2 bg-white md:px-10 px-4 md:w-[760px] mx-auto text-left md:py-10 rounded-2xl py-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-center md:text-2xl text-xl md:-mt-2 -mt-3 mb-3'>SIGN UP</h2>
        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Username</span>
          <input
            type='text'
            placeholder='Full Name...'
            className='mt-1 border-2 p-3 outline-none rounded-md'
            {...register('username')}
          />
          <p>{errors.username?.message}</p>
        </div>

        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Email</span>
          <input
            type='text'
            placeholder='Email...'
            {...register('email')}
            className='mt-1 border-2 p-3 outline-none rounded-md'
          />
          {errors.email?.message}
        </div>

        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Phone</span>
          <input
            type='text'
            placeholder='Phone...'
            {...register('phone')}
            className='mt-1 border-2 p-3 outline-none rounded-md'
          />
          {errors.phone?.message}
        </div>

        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Address</span>
          <input
            type='text'
            placeholder='Address...'
            {...register('address')}
            className='mt-1 border-2 p-3 outline-none rounded-md'
          />
          {errors.phone?.message}
        </div>

        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Password</span>
          <input
            type='password'
            className='mt-1 border-2 p-3 outline-none rounded-md'
            placeholder='Password...'
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>

        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Confirm Password</span>
          <input
            type='password'
            className='mt-1 border-2 p-3 outline-none rounded-md'
            placeholder='Confirm Password...'
            {...register('confirmPassword')}
          />
          <p className='text-red-500 mt-2'>{errors.confirmPassword?.message}</p>
        </div>
        <button className='bg-black text-white p-3 rounded-md cursor-pointer' type='submit'>
          {loading ? <Loading /> : 'Sign up'}
        </button>
        {existsUser && <p>User already exists</p>}
        <p className='md:mx-10 mx-2 text-center md:mt-6 mt-3 '>
          By clicking the Sign Up button above, you agree to our Terms and Conditions and Policy Privacy
        </p>
        <Link href='login'>
          <p className='text-blue-700 mx-auto md:mt-6 mt-3 cursor-pointer'>Already have an account? Login here</p>
        </Link>
      </form>
      <Toaster />
    </section>
  );
};

export default SignUp;

export const getServerSideProps = async () => {
  const userQuery = '*[_type=="user"]';
  const users = await client.fetch(userQuery);
  return {
    props: {
      users,
    },
  };
};
