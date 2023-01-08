export default {
  post: {
    tags: ['Round'],
    description: 'Create a round',
    operationId: 'createRound',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/roundCreation',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Round created successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
