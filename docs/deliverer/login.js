export default {
  post: {
    tags: ['Deliverer'],
    description: 'Login for deliverer',
    operationId: 'loginDeliverer',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/delivererLogin',
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
