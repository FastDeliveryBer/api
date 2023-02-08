export default {
  post: {
    tags: ['Customer'],
    description: 'Créer un compte client',
    operationId: 'createCustomer',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/customerCreation',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Compte client créé',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/customerGet',
            },
          },
        },
      },
      400: {
        description: 'Error',
      },
    },
  },
}
