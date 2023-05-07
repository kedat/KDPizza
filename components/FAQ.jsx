import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useTranslation } from 'next-i18next';


const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  const {t} = useTranslation('common');

  return (
    <div className=' my-8'>
      <h2 className='text-3xl font-bold mb-8'>{t('FAQ')}</h2>
      <div className=' space-y-4'>
        {/* single Faq */}

        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(2)}>
            <span className='text-lg font-medium'>{t('What_is_your_return_policy')}</span>
            {activeTab === 2 ? (
              <svg className='h-6 w-6 ' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='h-6 w-6 ' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            )}
          </button>
          {activeTab === 2 && (
            <div className='mt-4'>
              <p className='text-base'>
                {t('What_is_your_return_policy_reply')}
              </p>
            </div>
          )}
        </div>

        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(3)}>
            <span className='text-lg font-medium'>{t('How_do_I_track_my_order')}</span>
            {activeTab === 3 ? (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            )}
          </button>
          {activeTab === 3 && (
            <div className='mt-4'>
              <p className='text-base'>
                {t('How_do_I_track_my_order_reply')}
              </p>
            </div>
          )}
        </div>

        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(4)}>
            <span className='text-lg font-medium text-left'>{t('How_do_I_contact_customer_support')} </span>
            {activeTab === 4 ? (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            )}
          </button>
          {activeTab === 4 && (
            <div className='mt-4'>
              <p className='text-base'>
                {t('How_do_I_contact_customer_support_reply')}
              </p>
            </div>
          )}
        </div>

        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(5)}>
            <span className='text-lg font-medium text-left'>{t('Can_I_change_or_cancel_my_order')} </span>
            {activeTab === 5 ? (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            )}
          </button>
          {activeTab === 5 && (
            <div className='mt-4'>
              <p className='text-base'>
                {t('Can_I_change_or_cancel_my_order_reply')}
              </p>
            </div>
          )}
        </div>

        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(6)}>
            <span className='text-lg font-medium text-left'>{t('Do_you_offer_international_shipping')} </span>
            {activeTab === 6 ? (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            )}
          </button>
          {activeTab === 6 && (
            <div className='mt-4'>
              <p className='text-base'>{t('Do_you_offer_international_shipping_reply')} </p>
            </div>
          )}
        </div>

        <div className='border-b border-gray-200 pb-4'>
          <button className='flex items-center justify-between w-full' onClick={() => toggleTab(7)}>
            <span className='text-lg font-medium text-left'>{t('What_payment_methods_do_you_accept')} </span>
            {activeTab === 7 ? (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            )}
          </button>
          {activeTab === 7 && (
            <div className='mt-4'>
              <p className='text-base'>
              {t('What_payment_methods_do_you_accept_reply')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FAQ;
