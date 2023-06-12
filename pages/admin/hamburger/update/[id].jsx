import UpdateCategoryComponent from '../../../../components/Admin/Category/UpdateCategory';
import UpdateHamburgerComponent from '../../../../components/Admin/Hamburger/UpdateHamburger';
import Layout from '../../../../components/Layout/Layout';
import { client } from '../../../../lib/client';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='hamburger' && _id=='${params.id}']`;
  const categoryQuery = `*[_type=='category']`;
  const categories = await client.fetch(categoryQuery);
  const hamburger = await client.fetch(query);
  return {
    props: {
      hamburger: hamburger[0],
      categories,
    },
  };
};

const UpdateHamburger = ({ hamburger, categories }) => {
  return (
    <Layout>
      <UpdateHamburgerComponent hamburger={hamburger} categories={categories} />
    </Layout>
  );
};

export default UpdateHamburger;
