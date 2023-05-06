import UpdateUserComponent from '../../../../components/Admin/User/UpdateUser';
import Layout from '../../../../components/Layout/Layout';
import { client } from '../../../../lib/client';

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type=='user' && _id=='${params.id}']`;
  const user = await client.fetch(query);
  return {
    props: {
      user: user[0],
    },
  };
};

const UpdateUser = ({ user }) => {
  return (
    <Layout>
      <UpdateUserComponent user={user} />
    </Layout>
  );
};

export default UpdateUser;
