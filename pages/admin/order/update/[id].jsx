import UpdateOrderComponent from '../../../../components/Admin/Order/UpdateOrder';
import Layout from '../../../../components/Layout/Layout';
import { client } from '../../../../lib/client';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='order' && _id=='${params.id}']`;
  const order = await client.fetch(query);
  return {
    props: {
      order: order[0],
    },
  };
};

const UpdateOrder = ({ order }) => {
  return (
    <Layout>
      <UpdateOrderComponent order={order} />
    </Layout>
  );
};

export default UpdateOrder;
