export default {
  get: {
    tags: ['Round'],
    description: 'Get a round by his deliverer ID',
    operationId: 'getRoundByDelivererID',
    parameters: [
      {
        name: 'deliverer_id',
        in: 'path',
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
