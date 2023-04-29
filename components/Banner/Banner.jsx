import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import nawawi from '/assets/banner/pexels-ahmad-nawawi-2714722.jpg';
import eyer from '/assets/banner/pexels-edward-eyer-1049620.jpg';
import coming from '/assets/banner/pexels-cats-coming-367915.jpg';
import lee from '/assets/banner/pexels-kue-lee-1093015.jpg';
import eng from '/assets/banner/pexels-engin-akyurt-2619970.jpg';
import Slider from 'react-slick';
import CardCell from './Cell';
export const BANNER_DATA = {
  homepage: [
    {
      avatar: nawawi,
    },
    {
      avatar: eyer,
    },
    {
      avatar: coming,
    },
    {
      avatar: lee,
    },
    {
      avatar: eng,
    },
  ],
};

const { homepage } = BANNER_DATA;
const SETTINGS = {
  // infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1500,
  swipeToSlide: true,
  autoplaySpeed: 2000,
  focusOnSelect: true,
  arrows: false,
  pauseOnHover: true,
  pauseOnFocus: false,
};

const Banner = () => {
  return (
    <div>
      <Slider {...SETTINGS} className='md:-mt-10'>
        {homepage.length > 0 &&
          homepage.map((items) => <CardCell {...items} key={`slider-review-${items.customer}`} />)}
      </Slider>
    </div>
  );
};

export default Banner;
