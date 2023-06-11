import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import img from '/assets/HeroImage.png';
import Slider from 'react-slick';
import CardCell from './Cell';
export const PIZZA_DATA = {
  homepage: [
    [
      {
        star: 5,
        avatar: img,
        customer: 'Tuan Pham',
        comment: 'being thin would be nice, but have you ever tasted pizza',
      },
      {
        star: 5,
        avatar: img,
        customer: 'Phan Quanh',
        comment: 'people who don’t like pizza are weirdo',
      },
      {
        star: 5,
        avatar: img,
        customer: 'Chung Nguyen',
        comment: 'the answer to “What time is it?” is always “Pizza time”',
      },
    ],
    [
      {
        star: 5,
        avatar: img,
        customer: 'Thang Tran',
        comment: 'there are three food groups — crust, cheese, and sauce',
      },
      {
        star: 5,
        avatar: img,
        customer: 'Ke Dakr',
        comment: 'if you try hard enough, anything can go on a pizza',
      },
    ],
  ],
};

const { homepage } = PIZZA_DATA;
const SETTINGS = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 4000,
  swipeToSlide: true,
  autoplaySpeed: 1000,
  focusOnSelect: true,
  arrows: false,
  pauseOnHover: true,
  pauseOnFocus: false,
  centerMode: true,
  centerPadding: '0px',
  fade: true,
  responsive: [
    {
      breakpoint: 675,
      settings: {
        slidesToShow: 1,
        infinite: true,
        centerMode: true,
      },
    },
  ],
};

const MainCarousel = () => {
  return (
    <div className='mt-7'>
      <Slider {...SETTINGS}>
        {homepage.length > 0 &&
          homepage.map((items) =>
            items.map((review) => <CardCell {...review} key={`slider-review-${review.customer}`} />),
          )}
      </Slider>
    </div>
  );
};

export default MainCarousel;
