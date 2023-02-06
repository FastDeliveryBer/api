export default {
  admin: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description:
          'The unique tracking id for the client who create the parcel, can be null if not created by a client',
        example: 'XYZ123456789',
      },
      firstName: {
        type: 'String',
        description: 'First Name of admin',
        example: 'John',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of admin',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of admin',
        example: 'jdoe@myges.fr',
      },
      password: {
        type: 'String',
        description: 'Password of the admin to login in his account',
        example: 'FR',
      },
      phone: {
        type: 'Int',
        description: 'Phone of admin',
        example: '0123456789',
      },
    },
  },
  adminLogin: {
    type: 'object',
    properties: {
      email: {
        type: 'String',
        description: 'Mail of admin',
        example: 'jdoe@myges.fr',
      },
      password: {
        type: 'String',
        description: 'Password of the admin to login in his account',
        example: 'FR',
      },
    },
  },
}
