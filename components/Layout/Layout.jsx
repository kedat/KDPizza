import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='mx-3 md:mx-20 md:mt-48 mt-24 mb-16'>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
