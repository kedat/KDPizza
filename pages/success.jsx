
import Layout from "../components/Layout/Layout";
import OrderModal from "../components/OrderModal";

const Success = () => {
  return (
    <Layout>
      <OrderModal opened={true} paymentMethod={1} />
    </Layout>
  );
};
export default Success;
