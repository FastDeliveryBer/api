export default {
  get: {
    tags: ['Deliverer'],
    description: 'Get a deliverer',
    operationId: 'getDeliverer',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/deliverer',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Deliverer get successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/deliverer',
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
