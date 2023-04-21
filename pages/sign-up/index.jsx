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
    <section className=' md:mx-14 mx-3 bg-white '>
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
          <p>{errors.confirmPassword?.message}</p>
        </div>
        <button className='bg-black text-white p-3 rounded-md cursor-pointer' type='submit'>
          {loading ? (
            <span className='flex items-center justify-center'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </span>
          ) : (
            'Sign up'
          )}
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
