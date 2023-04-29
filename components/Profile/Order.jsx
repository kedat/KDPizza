import { isEmpty, map } from 'lodash';
import { Toaster } from 'react-hot-toast';
import { client } from '../../lib/client';

const AllOrder = ({ userOrders }) => {
  return (
    <div className='col-span-4'>
      <div className='w-full px-5'>Order</div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='bg-gray-300 border text-left px-8 py-4'>Name</th>
              <th className='bg-gray-300 border text-left px-8 py-4'>Phone</th>
              <th className='bg-gray-300 border text-left px-8 py-4'>Total</th>
              <th className='bg-gray-300 border text-left px-8 py-4'>Status</th>
              <th className='bg-gray-300 border text-left px-8 py-4'>Method</th>
              <th className='bg-gray-300 border text-left px-8 py-4'>Created at</th>
              <th className='bg-gray-300 border text-left px-8 py-4'>Updated at</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(userOrders) &&
              map(userOrders, (order) => (
                <tr key={order._id}>
                  <td className='border px-8 py-4'>{order.name}</td>
                  <td className='border px-8 py-4'>{order.phone}</td>
                  <td className='border px-8 py-4'>{order.total}</td>
                  <td className='border px-8 py-4'>{order.status}</td>
                  <td className='border px-8 py-4'>{order.method}</td>
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
