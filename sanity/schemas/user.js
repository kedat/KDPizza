export default {
    name: 'users',
    title: 'users',
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
        type: 'string',
        options: {
          maxLength: 15,
        },
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
        options: {
          maxLength: 150,
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
        type: 'number',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'number',
      },
    ],
  }
  