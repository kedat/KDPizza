import Head from 'next/head';
import Services from '../components/Services';
import css from '../styles/Home.module.css';
import { client } from '../lib/client';
import Menu from '../components/Menu';
import MainCarousel from '../components/Carousel/MainCarousel';
import { Login } from './login';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Category from '../components/Category';
import Layout from '../components/Layout/Layout';
import SetTheme from '../components/SetTheme';
import Banner from '../components/Banner/Banner';

const Home = ({ pizzas, categories }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className={css.container}>
        <Head>
          <title>Ke Dat</title>
          <meta name='description' content='Generated by create next app' />
          <link
            rel='icon'
            type='image/x-icon'
            href='https://scontent.fvii1-1.fna.fbcdn.net/v/t39.30808-6/262025650_1280619415787717_6337152687439208814_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=H8xbCdl3f8AAX_X4sIE&_nc_ht=scontent.fvii1-1.fna&oh=00_AfCbkyzPH0Dy2OmXFed_gSlFdf4Dgyscm6heZ2P0Yb8xXw&oe=6404C37E'
          ></link>
        </Head>
        {/* body */}
        <main>
          <Banner />
          <Category />
          <Services />
          <MainCarousel />
          <Menu pizzas={pizzas} categories={categories} />
        </main>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = '*[_type=="pizza"]';
  const categoryQuery = '*[_type=="category"]';
  const pizzas = await client.fetch(query);
  const categories = await client.fetch(categoryQuery);
  return {
    props: {
      pizzas,
      categories,
    },
  };
};
