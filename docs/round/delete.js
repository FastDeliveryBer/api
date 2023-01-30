export default {
  delete: {
    tags: ['Round'],
    description: 'Delete a round',
    operationId: 'deleteRound',
    parameters: [
      {
        name: 'round_id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Round delete successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
