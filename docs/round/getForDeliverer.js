export default {
  get: {
    tags: ['Round'],
    description: 'Get a round',
    operationId: 'getRound',
    parameters: [
      {
        name: 'id_deliverer',
        in: 'path',
        /* schema: {
          $ref: '#/components/schemas/id',
        }, */
        required: true,
        description: 'Get a round of a deliverer',
      },
    ],
    responses: {
      200: {
        description: 'Round get successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/round',
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
