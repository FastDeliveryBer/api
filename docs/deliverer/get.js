export default {
  get: {
    tags: ['Deliverer'],
    description: 'Get a deliverer with his ID',
    operationId: 'getDeliverer',
    parameters: [
      {
        name: 'deliverer_id',
        in: 'path',
        required: true,
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
