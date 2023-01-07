export default {
  deliverer: {
    type: 'object',
    properties: {
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
      password: {
        type: 'String',
        description: 'Password of the deliverer to login in his account',
        example: 'FR',
      },
      phone: {
        type: 'Int',
        description: 'Phone of deliverer',
        example: '0123456789',
      },
      langage: {
        type: 'String',
        description: 'Langage of the application choose by the deliverer',
        example: 'FR',
      },
      longitude: {
        type: 'String',
        description: 'Langage of the application choose by the deliverer',
        example: 'FR',
      },
      latitude: {
        type: 'String',
        description: 'Langage of the application choose by the deliverer',
        example: 'FR',
      },
    },
  },
  delivererLogin: {
    type: 'object',
    properties: {
      email: {
        type: 'String',
        description: 'Mail of deliverer',
        example: 'jdoe@myges.fr',
      },
      password: {
        type: 'String',
        description: 'Password of the deliverer to login in his account',
        example: 'FR',
      },
    },
  },
}
