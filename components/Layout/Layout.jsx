import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className='dark:bg-gray-900 dark:text-gray-300 min-h-screen'>
      <Header />
      <div className='mx-3 md:mx-20 mb-16 dark:text-gray-300'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
