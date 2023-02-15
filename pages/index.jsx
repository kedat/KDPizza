import Head from "next/head";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import css from "../styles/Home.module.css";

const Home = () => {
  return (
    <Layout>
      <div className={css.container}>
        <Head>
          <title>Ke Dat</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/Logo.png" />
        </Head>
        {/* body */}
        <main>
          <Hero />
        </main>
      </div>
    </Layout>
  );
};

export default Home;
