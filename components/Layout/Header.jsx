import Image from "next/image";
import css from "../../styles/Header.module.css";
import Logo from "../../assets/Logo.png";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { authActions } from "../../store/authSlice";

const Header = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const count = useSelector((state) => state.cart.pizzas.length);
	// state
	const [order, setOrder] = useState("");
	useEffect(() => {
		setOrder(localStorage.getItem("order"));
	}, []);

	const handleClickLogout = useCallback(() => {
		dispatch(authActions.logout());
		typeof window !== "undefined" && localStorage.setItem("isLogin", false);
		router.push("/login");
	}, [dispatch, router]);
	return (
		<div className={`${css.header} md:p-10 p-1 shadow-lg`}>
			{/* logo side */}
			<div className={css.logo}>
				<Image src={Logo} alt="Logo" width={50} height={50} />
				<span className="hidden md:block">Ke Dat</span>
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
						<div className={css.badge}>{count}</div>
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
				<button onClick={handleClickLogout}>Log Out</button>
			</div>
		</div>
	);
};

export default Header;
