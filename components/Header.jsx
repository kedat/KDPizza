import Image from "next/image";
import css from "../styles/Header.module.css";
import Logo from "../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  // state
  const [order, setOrder] = useState("");
  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);
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
        <Link href="../">Home</Link>
        <Link href="../">Menu</Link>
        <Link href="../">Contact</Link>
      </ul>

      {/* right side */}
      <div className={css.rightSide}>
        <Link href="/cart" className="cursor-pointer">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="2E2E2E" />
            <div className={css.badge}>{items}</div>
          </div>
        </Link>
        {order && (
          <Link href={`/order/${order}`} className="cursor-pointer">
            <div className={css.cart}>
              <UilReceipt size={35} color="2E2E2E" />
              {order != "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
