import Image from 'next/image';
import React, { FC } from 'react';
import { useWindowSize } from '../../lib/hooks';

const CardCell = ({ avatar }) => {
  const mobile = useWindowSize().width < 768;
  return (
    <div className='rounded-lg mb-8 h-72 md:h-[400px] gap-1 2xl:h-[700px]'>
      <Image alt='user-avatar-review' className='rounded-3xl' src={avatar} width='1700%' height={mobile ? 1200 : 800} />
    </div>
  );
};

export default CardCell;
