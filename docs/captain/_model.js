export default {
  captain: {
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
        description: 'First Name of captain',
        example: 'John',
      },
      lastName: {
        type: 'String',
        description: 'Last Name of captain',
        example: 'Doe',
      },
      email: {
        type: 'String',
        description: 'Mail of captain',
        example: 'jdoe@myges.fr',
      },
      password: {
        type: 'String',
        description: 'Password of the captain to login in his account',
        example: 'FR',
      },
      phone: {
        type: 'Int',
        description: 'Phone of captain',
        example: '0123456789',
      },
    },
  },
  captainLogin: {
    type: 'object',
    properties: {
      email: {
        type: 'String',
        description: 'Mail of captain',
        example: 'jdoe@myges.fr',
      },
      password: {
        type: 'String',
        description: 'Password of the captain to login in his account',
        example: 'FR',
      },
    },
  },
}
