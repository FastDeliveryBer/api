export default {
  delete: {
    tags: ['Round'],
    description: 'Update information of a round',
    operationId: 'updateRound',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/round',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Round updated successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
