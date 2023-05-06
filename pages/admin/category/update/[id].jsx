import UpdateCategoryComponent from '../../../../components/Admin/Category/UpdateCategory';
import Layout from '../../../../components/Layout/Layout';
import { client } from '../../../../lib/client';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='category' && _id=='${params.id}']`;
  const category = await client.fetch(query);
  return {
    props: {
      category: category[0],
    },
  };
};

const UpdateCategory = ({ category }) => {
  return (
    <Layout>
      <UpdateCategoryComponent category={category} />
    </Layout>
  );
};

export default UpdateCategory;
