import css from '../styles/Services.module.css';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const Services = () => {
  const { t } = useTranslation('common');
  return (
    <div className=''>
      <div className={`${css.heading} mt-10`}>
        <span>WHAT WE SERVE</span>
        <span>Your Favorite Food</span>
        <span>Delivery Partner</span>
      </div>
      {/* features */}
      <div className='flex justify-center mt-10 flex-col lg:flex-row'>
        <div className={`${css.feature} mb-20`}>
          <div className={css.ImageWrapper}>
            <Image src={s1} alt='s1' objectFit='cover' layout='intrinsic' />
          </div>
          <span className='font-bold'>Easy to order</span>
          <span className='text-gray-500 break-words w-[20rem] text-center'>
            You only need a few steps in food ordering
          </span>
        </div>

        <div className={`${css.feature} mb-20`}>
          <div className={css.ImageWrapper}>
            <Image src={s2} alt='s2' objectFit='cover' layout='intrinsic' />
          </div>
          <span className='font-bold'>Easy to order</span>
          <span className='text-gray-500 break-words w-[20rem] text-center'>
            Delivery that is always on time even faster
          </span>
        </div>

        <div className={`${css.feature} mb-20`}>
          <div className={css.ImageWrapper}>
            <Image src={s3} alt='s3' objectFit='cover' layout='intrinsic' />
          </div>
          <span className='font-bold'>Easy to order</span>
          <span className='text-gray-500 break-words w-[20rem] text-center'>{t('tet')}</span>
        </div>
      </div>
    </div>
  );
};
export default Services;
