import css from "../styles/Cart.module.css";
import Layout from "../components/Layout";
import Image from "next/image";
import { useStore } from "../store/store";
import { urlFor } from "../lib/client";
import { useCallback, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import OrderModal from "../components/OrderModal";

const Cart = () => {
  const CartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const onHandleClickRemove = useCallback((e) => {
    removePizza(e.target.id);
    toast.error("Item removed");
  });

  const total = useCallback(
    () => CartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0),
    [CartData]
  );

  const onHandleDelivery = useCallback(() => {
    setPaymentMethod(0);
    localStorage.setItem("total", total());
  });
  return (
    <Layout>
      <div className={css.container}>
        {/* detail */}
        <div className={css.detail}>
          <table className={css.table}>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
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
                      <td>
                        {pizza.size === 0
                          ? "Small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Larger"}
                      </td>
                      <td>{pizza.price}</td>
                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <button
                        id={index}
                        className="text-red-500"
                        onClick={onHandleClickRemove}
                      >
                        x
                      </button>
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
          <div className={css.buttons}>
            <button className="btn" onClick={onHandleDelivery}>
              Pay on Delivery
            </button>
            <button className="btn">Pay now</button>
          </div>
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
