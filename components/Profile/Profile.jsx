import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../lib/client';
import { toast, Toaster } from 'react-hot-toast';
import { getAccountInfo } from '../../lib/getAccountInfo';
import { useRef } from 'react';
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
          {loading ? (
            <span className='flex items-center justify-center'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 mr-2 text-gray-200 dark:text- white animate-spin fill-blue-600'
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
            'Update profile'
          )}
        </button>
      </form>
    </div>
  );
};

export default Profile;
