export default {
  name: 'order',
  title: 'order',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
      options: {
        maxLength: 150,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      options: {
        maxLength: 40,
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
      name: 'method',
      title: 'Method',
      type: 'number',
    },
    {
      name: 'total',
      title: 'Total',
      type: 'number',
    },
    {
      name: 'item',
      title: 'item',
      type: 'array',
      of: [
        {
          type: "object",
          name: "foods",
          fields: [
            { type: "string", name: "name" },
            { type: "number", name: "quantity" },
          ]
        }
      ],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'number',
    },
  ],
}
