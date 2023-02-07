export default {
  post: {
    tags: ['Customer'],
    description: 'Create a customer',
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
      200: {
        description: 'Customer created successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
