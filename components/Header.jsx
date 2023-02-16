import Image from "next/image";
import css from "../styles/Header.module.css";
import Logo from "../assets/Logo.png";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { useStore } from "../store/store";

const Header = () => {
  // state
  const state = useStore((state) => state);
  console.log(state);
  const items = useStore((state) => state.cart.pizzas.length);
  return (
    <div className={css.header}>
      {/* logo side */}
      <div className={css.logo}>
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <span>Ke Dat</span>
      </div>

      {/* menu side */}
      <ul className={css.menu}>
        <li>Home</li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>

      {/* right side */}
      <div className={css.rightSide}>
        <div className={css.card}>
          <UilShoppingBag size={35} color="2E2E2E" />
          <div className={css.badge}>{items}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
