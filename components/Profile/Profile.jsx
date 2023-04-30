import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import { getAccountInfo } from '../../lib/getAccountInfo';
const Profile = () => {
  const router = useRouter();

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

  const handleSubmit = (e) => {
    // e.preventDefault();
    // client
    //   .patch(user._id) // Document ID to patch
    //   .set({ name: name, email: email, phone: Number(phoneNumber) })
    //   .commit() // Perform the patch and return a promise
    //   .catch((err) => {
    //     console.error('Oh no, the update failed: ', err.message);
    //   });
    toast.success('Updated');
    router.push('profile');
    setName(name);
    setUserName(name);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    typeof window !== 'undefined' && localStorage.setItem('username', name);
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
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='name@flowbite.com'
            required
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
