export default {
  get: {
    tags: ['Round'],
    description: 'Get a round by his ID',
    operationId: 'getRound',
    parameters: [
      {
        name: 'round_id',
        in: 'path',
        required: true,
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
