import UpdateCategoryComponent from '../../../../components/Admin/Category/UpdateCategory';
import UpdateAsianFoodComponent from '../../../../components/Admin/AsianFood/UpdateAsianFood';
import Layout from '../../../../components/Layout/Layout';
import { client } from '../../../../lib/client';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='asianFood' && _id=='${params.id}']`;
  const categoryQuery = `*[_type=='category']`;
  const categories = await client.fetch(categoryQuery);
  const asianFood = await client.fetch(query);
  return {
    props: {
      asianFood: asianFood[0],
      categories,
    },
  };
};

const UpdateAsianFood = ({ asianFood, categories }) => {
  return (
    <Layout>
      <UpdateAsianFoodComponent asianFood={asianFood} categories={categories} />
    </Layout>
  );
};

export default UpdateAsianFood;
