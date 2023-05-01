import Image from 'next/image';
import { useWindowSize } from '../../lib/hooks';

const CardCell = ({ customer, avatar, comment }) => {
  const mobile = useWindowSize().width < 768;

  return (
    <div
      className={`rounded-lg flex justify-center items-center flex-col mb-8 mr-3 md:mr-1 bg-gradient-to-r from-purple-500 to-pink-500 gap-1 ${
        mobile ? 'h-[266px]' : ''
      } p-7 pb-10`}
    >
      <div>
        <Image alt='user-avatar-review' className='w-10 h-10 rounded-full' src={avatar} width='41' height='41' />
        <h6 className='font-medium text-black-russian text-base md:text-lg'>{customer}</h6>
      </div>
      <div>
        <span className='text-base font-normal text-gray-smoky leading-7.5'>{comment}</span>
      </div>
    </div>
  );
};

export default CardCell;
