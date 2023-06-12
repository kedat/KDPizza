import UpdateCategoryComponent from '../../../../components/Admin/Category/UpdateCategory';
import UpdatePizzaComponent from '../../../../components/Admin/Pizza/UpdatePizza';
import Layout from '../../../../components/Layout/Layout';
import { client } from '../../../../lib/client';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='pizza' && _id=='${params.id}']`;
  const categoryQuery = `*[_type=='category']`;
  const categories = await client.fetch(categoryQuery);
  const pizza = await client.fetch(query);
  return {
    props: {
      pizza: pizza[0],
      categories,
    },
  };
};

const UpdatePizza = ({ pizza, categories }) => {
  return (
    <Layout>
      <UpdatePizzaComponent pizza={pizza} categories={categories} />
    </Layout>
  );
};

export default UpdatePizza;
