export default {
  get: {
    tags: ['Deliverer'],
    description: 'Get a deliverer with his ID',
    operationId: 'getDeliverer',
    parameters: [
      {
        name: '_id',
        in: 'path',
        required: false,
      },
    ],
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
