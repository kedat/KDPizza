import Layout from '../components/Layout/Layout';
import OrderModal from '../components/OrderModal';

const Success = () => {
  const newPi = typeof window !== 'undefined' && localStorage.getItem('newPi');
  const newPizzas = JSON.parse(newPi);

  return (
    <Layout>
      <OrderModal opened={true} paymentMethod={1} pizzas={newPizzas} />
    </Layout>
  );
};
export default Success;
