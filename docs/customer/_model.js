export default {
  customer: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'The unique tracking id for the customer',
        example: 'XYZ123456789',
      },
      firstname: {
        type: 'String',
        description: 'First Name of customer',
        example: 'John',
      },
      lastname: {
        type: 'String',
        description: 'Last Name of customer',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of customer, use to login',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'Int',
        description: 'Phone of customer',
        example: '0123456789',
      },
      password: {
        type: 'String',
        description: 'Password of the customer to login in his account',
        example: 'FR',
      },
    },
  },
  customerGet: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'The unique tracking id for the customer',
        example: 'XYZ123456789',
      },
      firstname: {
        type: 'String',
        description: 'First Name of customer',
        example: 'John',
      },
      lastname: {
        type: 'String',
        description: 'Last Name of customer',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of customer',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'String',
        description: 'Phone of customer',
        example: '0123456789',
      },
    },
  },
  customerCreation: {
    type: 'object',
    properties: {
      firstname: {
        type: 'String',
        description: 'First Name of customer',
        example: 'John',
      },
      lastname: {
        type: 'String',
        description: 'Last Name of customer',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of customer',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'String',
        description: 'Phone of customer',
        example: '0123456789',
      },
      password: {
        type: 'String',
        description: 'Password of the customer to login in his account',
        example: 'Azerty',
      },
    },
  },
  customerUpdate: {
    type: 'object',
    properties: {
      firstname: {
        type: 'String',
        description: 'First Name of customer',
        example: 'John',
      },
      lastname: {
        type: 'String',
        description: 'Last Name of customer',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of customer, use to login',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'String',
        description: 'Phone of customer',
        example: '0123456789',
      },
    },
  },
  customerLogin: {
    type: 'object',
    properties: {
      email: {
        type: 'String',
        description: 'Mail of customer',
        example: 'jdoe@myges.fr',
      },
      password: {
        type: 'String',
        description: 'Password of the customer to login in his account',
        example: 'FR',
      },
    },
  },
}
