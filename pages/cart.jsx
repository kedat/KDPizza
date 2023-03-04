import css from "../styles/Cart.module.css";
import Layout from "../components/Layout";
import Image from "next/image";
import { urlFor } from "../lib/client";
import { useCallback, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import OrderModal from "../components/OrderModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { removePizza } from "../store/store";

const Cart = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const CartData = useSelector((state) => state.cart);
	const [paymentMethod, setPaymentMethod] = useState(1);
	const [order, setOrder] = useState(
		typeof window !== "undefined" && localStorage.getItem("order")
	);
	const onHandleClickRemove = useCallback(
		(e) => {
			dispatch(removePizza(e.target.id));
			toast.error("Item removed");
		},
		[dispatch]
	);

	const total = useCallback(
		() => CartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0),
		[CartData]
	);

	const onHandleDelivery = useCallback(() => {
		setPaymentMethod(0);
		typeof window !== "undefined" && localStorage.setItem("total", total());
	}, [total]);

	const onHandleCheckout = useCallback(async () => {
		typeof window !== "undefined" && localStorage.setItem("total", total());
		setPaymentMethod(1);
		const response = await fetch("api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(CartData.pizzas),
		});
		if (response.status === 500) return;
		const data = await response.json();
		toast.loading("Redirecting...");
		router.push(data.url);
	}, [CartData.pizzas, router, total]);

	return (
		<Layout>
			<div
				className={`${css.container} !flex flex-col md:grid !md:grid-cols-2 `}
			>
				{/* detail */}
				<div className={css.detail}>
					<table className={css.table}>
						<thead>
							<th>Pizza</th>
							<th>Name</th>
							<th className="hidden md:block text-center">Size</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Total</th>
							<th></th>
						</thead>
						<tbody className={css.tbody}>
							{CartData.pizzas.length > 0 &&
								CartData.pizzas.map((pizza, index) => {
									const src = urlFor(pizza.image).url();
									return (
										<tr key={index}>
											<td>
												<Image
													loader={() => src}
													className="rounded-xl"
													src={src}
													alt="pizza"
													objectFit="cover"
													width={85}
													height={85}
													unoptimized
												/>
											</td>
											<td className="w-[15%]">{pizza.name}</td>
											<td className="hidden md:block text-center h-full ">
												{pizza.size === 0
													? "Small"
													: pizza.size === 1
													? "Medium"
													: "Larger"}
											</td>
											<td>{pizza.price}</td>
											<td>{pizza.quantity}</td>
											<td>{pizza.price * pizza.quantity}</td>
											<td>
												<button
													id={index}
													className="text-red-500"
													onClick={onHandleClickRemove}
												>
													x
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				{/* summary */}
				<div className={css.cart}>
					<span>Cart</span>
					<div className={css.cartDetails}>
						<div>
							<span>Items</span>
							<span>{CartData.pizzas.length}</span>
						</div>
						<div>
							<span>Total</span>
							<span>$ {total()}</span>
						</div>
					</div>
					{!order && CartData.pizzas.length > 0 ? (
						<div className={css.buttons}>
							<button className="btn" onClick={onHandleDelivery}>
								Pay on Delivery
							</button>
							<button className="btn" onClick={onHandleCheckout}>
								Pay now
							</button>
						</div>
					) : null}
				</div>
			</div>
			<Toaster />
			{/* Modal */}
			<OrderModal
				opened={paymentMethod === 0}
				paymentMethod={paymentMethod}
				setOpened={setPaymentMethod}
			/>
		</Layout>
	);
};
export default Cart;
