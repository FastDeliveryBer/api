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
        description: 'First Name of client',
        example: 'John',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of client',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of client, use to login',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'Int',
        description: 'Phone of client',
        example: '0123456789',
      },
      password: {
        type: 'String',
        description: 'Password of the client to login in his account',
        example: 'FR',
      },
    },
  },
  clientGet: {
    type: 'object',
    properties: {
      client_id: {
        type: 'string',
        description: 'The unique tracking id for the client',
        example: 'XYZ123456789',
      },
      firstName: {
        type: 'String',
        description: 'First Name of client',
        example: 'John',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of client',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of client',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'Int',
        description: 'Phone of client',
        example: '0123456789',
      },
    },
  },
  clientCreation: {
    type: 'object',
    properties: {
      firstName: {
        type: 'String',
        description: 'First Name of client',
        example: 'John',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of client',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of client',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'Int',
        description: 'Phone of client',
        example: '0123456789',
      },
      password: {
        type: 'String',
        description: 'Password of the client to login in his account',
        example: 'FR',
      },
    },
  },
  clientUpdate: {
    type: 'object',
    properties: {
      firstName: {
        type: 'String',
        description: 'First Name of client',
        example: 'John',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of client',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of client, use to login',
        example: 'jdoe@myges.fr',
      },
      phone: {
        type: 'Int',
        description: 'Phone of client',
        example: '0123456789',
      },
      password: {
        type: 'String',
        description: 'Password of the client to login in his account',
        example: 'FR',
      },
    },
  },
  clientLogin: {
    type: 'object',
    properties: {
      email: {
        type: 'String',
        description: 'Mail of client',
        example: 'jdoe@myges.fr',
      },
      password: {
        type: 'String',
        description: 'Password of the client to login in his account',
        example: 'FR',
      },
    },
  },
}
