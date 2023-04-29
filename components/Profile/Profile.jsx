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
    <div className='w-full px-5'>
      <form>
        <div className='w-full 800px:flex block pb-3'>
          <div className=' w-[100%] 800px:w-[50%]'>
            <label className='block pb-2'>Full Name</label>
            <input
              type='text'
              className={` !w-[95%] mb-4 800px:mb-0`}
              required
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=' w-[100%] 800px:w-[50%]'>
            <label className='block pb-2'>Email Address</label>
            <input
              type='text'
              className={` !w-[95%] mb-1 800px:mb-0`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className='w-full 800px:flex block pb-3'>
          <div className=' w-[100%] 800px:w-[50%]'>
            <label className='block pb-2'>Phone Number</label>
            <input
              type='number'
              className={` !w-[95%] mb-4 800px:mb-0`}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <button
          className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
