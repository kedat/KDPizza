import { isEmpty, map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { client } from '../../../lib/client';

const AllUser = ({ users }) => {
  const router = useRouter();

  return (
    <div className='col-span-4'>
      <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className='table w-full text-center'>
          <thead>
            <tr>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>ID</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Name</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Email</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Phone</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Status</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(users) &&
              map(users, (user) => (
                <tr key={user._id}>
                  <td className='border px-8 py-4'>
                    <Link href={`./user/info/${user._id}`}>{user._id}</Link>
                  </td>
                  <td className='border px-8 py-4'>
                    <Link href={`./user/info/${user._id}`}>{user.name}</Link>
                  </td>
                  <td className='border px-8 py-4'>{user.email}</td>
                  <td className='border px-8 py-4'>{user.phone}</td>
                  <td className='border px-8 py-4'>{user.status === 1 ? 'Active' : 'Inactive'}</td>
                  <td className='border px-8 py-4'>
                    <Link href={`admin/user/update/${user._id}`}>
                      <span className=' hover:text-red-500 cursor-pointer'>Update </span>
                    </Link>
                    <button
                      className='hover:text-red-500'
                      onClick={() => {
                        setShowConfirmModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button
        className='relative inline-flex items-center justify-end p-0.5 mt-5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
        onClick={() => {
          router.push('admin/user/add');
        }}
      >
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
          Add new
        </span>
      </button>
      <Toaster />
    </div>
  );
};

export default AllUser;
