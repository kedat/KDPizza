import Image from 'next/image';
import React, { FC } from 'react';

const CardCell = ({ avatar }) => {
  return (
    <div className='rounded-lg mb-8  gap-1 2xl:h-[700px]'>
      <Image alt='user-avatar-review' className='rounded-3xl' src={avatar} width='1700%' height={800} />
    </div>
  );
};

export default CardCell;
