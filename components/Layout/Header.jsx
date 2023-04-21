import Image from 'next/image';
import css from '../../styles/Header.module.css';
import Logo from '../../assets/Logo.png';
import { UilShoppingBag, UilReceipt, UilUser, UilSetting, UilSignout } from '@iconscout/react-unicons';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../../store/authSlice';
import { DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Dropdown } from 'flowbite-react';
import SetTheme from '../SetTheme';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const count = cartState.pizzas.length;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(typeof window !== 'undefined' && localStorage.getItem('username'));
  }, []);
  // state
  const [order, setOrder] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    setOrder(localStorage.getItem('order'));
  }, []);

  const handleClickLogout = useCallback(() => {
    dispatch(logout());
    typeof window !== 'undefined' && localStorage.setItem('isLogin', false);
    localStorage.removeItem('username');
    router.push('/login');
  }, [dispatch, router]);
  return (
    <div className={`${css.header} md:p-10 p-1 shadow-lg`}>
      {/* logo side */}
      <div className={css.logo}>
        <Image src={Logo} alt='Logo' width={50} height={50} />
        <span className='hidden md:block'>Ke Dat</span>
      </div>

      {/* menu side */}
      <ul className={css.menu}>
        <Link href='../'>Home</Link>
        <Link href='contact'>Contact</Link>
        <Link href='faq'>FAQ</Link>
      </ul>

      {/* right side */}
      <div className={css.rightSide}>
        <Link href='/cart' className='cursor-pointer'>
          <div className={css.cart}>
            <UilShoppingBag size={35} color='2E2E2E' />
            <div className={css.badge}>{count}</div>
          </div>
        </Link>
        {order && (
          <Link href={`/order/${order}`} className='cursor-pointer'>
            <div className={css.cart}>
              <UilReceipt size={35} color='2E2E2E' />
              {order != '' && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
        <div className='relative'>
          <Dropdown label={userName ? userName.slice(0, 1) : ''} className='flex justify-center items-center'>
            <Dropdown.Header>
              <span className='block text-sm'>{userName}</span>
            </Dropdown.Header>
            <Dropdown.Item
              icon={UilUser}
              onClick={() => {
                router.push('/profile');
              }}
            >
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item icon={UilSetting}>Settings</Dropdown.Item>
            <SetTheme />
            <Dropdown.Divider />
            {userName ? (
              <Dropdown.Item icon={UilSignout} onClick={handleClickLogout}>
                Sign out
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                icon={UilSignout}
                onClick={() => {
                  router.push('/login');
                }}
              >
                Login
              </Dropdown.Item>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
