export default {
  post: {
    tags: ['Customer'],
    description: 'Login for customer',
    operationId: 'loginCustomer',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/customerLogin',
          },
          required: true,
        },
      },
    },
    responses: {
      200: {
        description: 'Login successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
