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
    },
  },
}
