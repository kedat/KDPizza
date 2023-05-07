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
        <span>{t('WHAT_WE_SERVE')}</span>
        <span>{t('Your_Favorite_Food')}</span>
        <span>{t('Delivery_Partner')}</span>
      </div>
      {/* features */}
      <div className='flex justify-center mt-10 flex-col lg:flex-row'>
        <div className={`${css.feature} mb-20`}>
          <div className={css.ImageWrapper}>
            <Image src={s1} alt='s1' objectFit='cover' layout='intrinsic' />
          </div>
          <span className='font-bold'>{t('Easy_to_order')}</span>
          <span className='text-gray-500 break-words w-[20rem] text-center'>
            {t('You_only_need_a_few_steps_in_food_ordering')}
          </span>
        </div>

        <div className={`${css.feature} mb-20`}>
          <div className={css.ImageWrapper}>
            <Image src={s2} alt='s2' objectFit='cover' layout='intrinsic' />
          </div>
          <span className='font-bold'>{t('Easy_to_order')}</span>
          <span className='text-gray-500 break-words w-[20rem] text-center'>
            {t('Delivery_that_is_always_on_time_even_faster')}
          </span>
        </div>

        <div className={`${css.feature} mb-20`}>
          <div className={css.ImageWrapper}>
            <Image src={s3} alt='s3' objectFit='cover' layout='intrinsic' />
          </div>
          <span className='font-bold'>{t('Easy_to_order')}</span>
          <span className='text-gray-500 break-words w-[20rem] text-center'>{t('tet')}</span>
        </div>
      </div>
    </div>
  );
};
export default Services;
