export default {
  name: 'user',
  title: 'user',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      options: {
        maxLength: 30,
      },
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'number',
      options: {
        maxLength: 15,
      },
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'number',
    },
  ],
}
