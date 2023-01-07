export default {
  client: {
    type: 'object',
    properties: {
      client_id: {
        type: 'string',
        description: 'The unique tracking id for the client',
        example: 'XYZ123456789',
      },
      firstName: {
        type: 'String',
        description: 'First Name of deliverer',
        example: 'John',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of deliverer',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of deliverer',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'Int',
        description: 'Phone of deliverer',
        example: '0123456789',
      },
      amount: {
        type: 'number',
        description: 'The price of the client based on the weight',
        example: '10.50',
      },
    },
  },
}
