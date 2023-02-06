export default {
  patch: {
    tags: ['Round'],
    description: 'Update information of a round',
    operationId: 'updateRound',
    parameters: [
      {
        name: 'round_id',
        in: 'path',
        required: true,
      },
    ],
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
      404: {
        description: 'Not found',
      },
    },
  },
}
