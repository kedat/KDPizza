import { isEmpty, map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { client } from '../../lib/client';

const AllOrder = ({ userOrders }) => {
  return (
    <div className='col-span-4'>
      <div className='overflow-x-auto max-h-[500px] overflow-y-auto'>
        <table className='table w-full text-center'>
          <thead>
            <tr>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Name</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Phone</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Total</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Status</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Method</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Created at</th>
              <th className='text-gray-700 uppercase bg-gray-50 border px-8 py-4'>Updated at</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(userOrders) &&
              map(userOrders, (order) => (
                <tr key={order._id}>
                  <td className='border px-8 py-4'>
                    <Link href={`./order/${order._id}`}>{order.name}</Link>
                  </td>
                  <td className='border px-8 py-4'>{order.phone}</td>
                  <td className='border px-8 py-4'>{order.total}</td>
                  {order.status === 1 && <td className='border px-8 py-4'>Cooking</td>}
                  {order.status === 2 && <td className='border px-8 py-4'>On way</td>}
                  {order.status === 3 && <td className='border px-8 py-4'>Delivered</td>}
                  {order.status === 4 && <td className='border px-8 py-4'>Completed</td>}
                  {order.status === -1 && <td className='border px-8 py-4'>Canceled</td>}
                  <td className='border px-8 py-4'>{order.method === 0 ? 'Pay on Delivery' : 'Online Payment'}</td>
                  <td className='border px-8 py-4'>{order._createdAt}</td>
                  <td className='border px-8 py-4'>{order._updatedAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Toaster />
    </div>
  );
};

export default AllOrder;
