import css from '../../styles/Pizza.module.css';
import Image from 'next/image';
import { client, urlFor } from '../../lib/client';
import LeftArrow from '../../assets/arrowLeft.png';
import RightArrow from '../../assets/arrowRight.png';
import { useCallback, useState } from 'react';
import { addPizza } from '../../store/cardSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/Layout';

const Pizza = ({ hamburger }) => {
  const dispatch = useDispatch();
  const src = urlFor(hamburger.image).url();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(1);
  const onClickSmall = useCallback(() => {
    setSize(0);
  }, []);
  const onClickMedium = useCallback(() => {
    setSize(1);
  }, []);
  const onClickLarge = useCallback(() => {
    setSize(2);
  }, []);
  const handleQuantity = useCallback(
    (type) => {
      type === 'inc' ? setQuantity((pre) => pre + 1) : quantity === 1 ? null : setQuantity((pre) => pre - 1);
    },
    [quantity],
  );

  // add to card function
  const addToCard = useCallback(() => {
    dispatch(
      addPizza({
        ...hamburger,
        price: hamburger.price[size],
        quantity: quantity,
        size: size,
      }),
    );
    toast.success('Added to card!');
  }, [dispatch, hamburger, size, quantity]);
  return (
    <Layout>
      <div className={`${css.container} flex-col md:flex-row items-center md:pt-48 pt-24 px-2`}>
        <div className={`${css.imageWrapper} md:w-[40%] w-full`}>
          <Image loader={() => src} src={src} alt='hamburger' objectFit='cover' layout='fill' />
        </div>

        {/* right side */}
        <div className={`${css.right} mx-10 `}>
          <span>{hamburger.name}</span>
          <span>{hamburger.details}</span>

          <span>
            <span className='text-red-500'>$</span> {hamburger.price[size]}
          </span>
          <div className='flex md:gap-[1rem] font-semibold text-[1.6rem] flex-col '>
            <span>Size</span>
            <div className={css.sizeVariants}>
              <div onClick={onClickSmall} className={size === 0 ? css.selected : ''}>
                Small
              </div>
              <div onClick={onClickMedium} className={size === 1 ? css.selected : ''}>
                Medium
              </div>
              <div onClick={onClickLarge} className={size === 2 ? css.selected : ''}>
                Large
              </div>
            </div>
          </div>

          {/* Quantity counter */}
          <div className={`${css.quantity} my-3`}>
            <span>Quantity</span>
            <div className={css.counter}>
              <Image
                src={LeftArrow}
                alt='leftArrow'
                objectFit='contain'
                width={13}
                height={13}
                onClick={() => handleQuantity('dec')}
              />
              <span>{quantity}</span>
              <Image
                src={RightArrow}
                alt='leftArrow'
                objectFit='contain'
                width={13}
                height={13}
                onClick={() => handleQuantity('inc')}
              />
            </div>
          </div>
          {/* button */}
          <div className={`btn ${css.btn}`} onClick={addToCard}>
            Add to Card
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};
export default Pizza;

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type=="hamburger" && defined(slug.current)][].slug.current`);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { slug = '' } = context.params;
  const hamburger = await client.fetch(`*[_type=="hamburger" && slug.current=='${slug}'][0]`);
  return {
    props: {
      hamburger,
    },
  };
}
