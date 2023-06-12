import UpdateCategoryComponent from '../../../../components/Admin/Category/UpdateCategory';
import UpdateTeaComponent from '../../../../components/Admin/Tea/UpdateTea';
import Layout from '../../../../components/Layout/Layout';
import { client } from '../../../../lib/client';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='tea' && _id=='${params.id}']`;
  const categoryQuery = `*[_type=='category']`;
  const categories = await client.fetch(categoryQuery);
  const tea = await client.fetch(query);
  return {
    props: {
      tea: tea[0],
      categories,
    },
  };
};

const UpdateTea = ({ tea, categories }) => {
  return (
    <Layout>
      <UpdateTeaComponent tea={tea} categories={categories} />
    </Layout>
  );
};

export default UpdateTea;
