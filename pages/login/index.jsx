import React, { useState } from 'react';
import back from '../../assets/my-account.jpg';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../store/authSlice';
import Image from 'next/image';
import { useWindowSize } from '../../lib/hooks';
import { useRouter } from 'next/router';
import { client } from '../../lib/client';
import Link from 'next/link';

const Login = ({ users }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useWindowSize().width < 768;
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [wrongInfo, setWrongInfo] = useState(false);
  const [notExistsUser, setNotExistsUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existsUser = users.filter((user, id) => {
      if (user.name == name && user.password == pass) {
        return user;
      }
    });
    if (existsUser.length > 0) {
      setWrongInfo(false);
      dispatch(login());
      dispatch(setUser(name));
      {
        typeof window !== 'undefined' && localStorage.setItem('isLogin', true);
        typeof window !== 'undefined' && localStorage.setItem('username', name);
        typeof window !== 'undefined' && localStorage.setItem('userId', existsUser[0]._id);
      }
      router.push('/');
      return;
    } else setWrongInfo(true);
  };

  return (
    <section className=' md:px-14 px-3 bg-white min-h-screen dark:bg-gray-900'>
      <Image src={back} alt='' height={mobile ? 800 : 500} />
      <form
        className='border border-1 flex flex-col md:my-10 my-2 bg-white md:px-10 px-4 md:w-[760px] mx-auto text-left md:py-10 rounded-2xl py-10'
        onSubmit={handleSubmit}
      >
        <h2 className='text-center md:text-2xl text-xl md:-mt-2 -mt-3 mb-3'>LOGIN</h2>
        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Username</span>
          <input
            className='mt-1 border-2 p-3 outline-none rounded-md'
            type='text'
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='mb-3 md:mb-6 flex flex-col'>
          <span>Password * </span>
          <input
            className='mt-1 border-2 p-3 outline-none rounded-md'
            type='password'
            required
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        {wrongInfo && <p className='text-red-600'>Wrong user name or password</p>}
        <button className='bg-black text-white p-3 rounded-md'>Log in </button>
        <Link href='sign-up'>
          <p className='text-blue-700 mx-auto md:mt-6 mt-3 cursor-pointer'>Do not have an account? Sign up here</p>
        </Link>
      </form>
    </section>
  );
};

export default Login;

export const getServerSideProps = async () => {
  const userQuery = '*[_type=="user"]';
  const users = await client.fetch(userQuery);
  return {
    props: {
      users,
    },
  };
};
