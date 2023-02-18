import css from "../styles/OpenModal.module.css";
import { useMantineTheme, Modal } from "@mantine/core";
import { useCallback, useState } from "react";
import { createOrder } from "../lib/orderHandle";
import { toast, Toaster } from "react-hot-toast";
import { useStore } from "../store/store";

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const theme = useMantineTheme();
  const [formData, setFormData] = useState({});
  const total = typeof window !== "undefined" && localStorage.getItem("total");
  const handleInputChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const id = await createOrder({ ...formData, total, paymentMethod });
      // console.log("🚀 ~ file: OrderModal.jsx:19 ~ handleSubmit ~ formData", formData)
      toast.success("Order Placed");
      resetCart();
      {
        typeof window !== "undefined" && localStorage.setItem("order", id);
      }
    },
    [formData, total, paymentMethod]
  );

  const resetCart = useStore((state) => state.resetCart);
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          required
          placeholder="Phone number"
          onChange={handleInputChange}
        />
        <textarea
          name="address"
          rows="3"
          placeholder="Address"
          onChange={handleInputChange}
        ></textarea>
        <span>
          You will pay{" "}
          <span className="font-bold text-red-500 text-[1.3rem]">${total}</span>{" "}
          on delivery
        </span>
        <button type="submit" className="btn">
          Place order
        </button>
      </form>
    </Modal>
  );
};
export default OrderModal;
