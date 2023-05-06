import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import { getAccountInfo } from '../../lib/getAccountInfo';
import { useRef } from 'react';
import Loading from '../common/Loading';
const Profile = () => {
  const router = useRouter();
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState('');
  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const getUser = useCallback(async () => {
    try {
      const userId = typeof window !== 'undefined' && localStorage.getItem('userId');
      const { documents } = await getAccountInfo(userId);
      await setUser(documents[0]);
      setName(user && user.name);
      setEmail(user && user.email);
      setPhoneNumber(user && user.phone);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }, [user, setUser, setName]);

  useEffect(() => {
    if (!name) {
      getUser();
    }
  }, [getUser, name]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    emailInputRef.current.blur();
    phoneInputRef.current.blur();
    await client
      .patch(user._id) // Document ID to patch
      .set({ email: email, phone: Number(phoneNumber) }) // Shallow merge
      .commit() // Perform the patch and return a promise
      .then(() => {
        toast.success('Updated');
        router.push('profile');
        setEmail(email);
        setPhoneNumber(phoneNumber);
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message);
      });
    setLoading(false);
  };

  return (
    <div className='w-full px-5 md:border md:py-5 md:rounded-lg'>
      <form>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Full Name
          </label>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={name}
            disabled
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Email Address
          </label>
          <input
            type='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInputRef}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Phone Number
          </label>
          <input
            type='number'
            id='phone'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            ref={phoneInputRef}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Status
          </label>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            disabled
            value={user && user.status === 1 ? 'Active' : 'Disabled'}
          />
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          {loading ? <Loading /> : 'Update profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
