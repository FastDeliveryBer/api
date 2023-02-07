export default {
  delete: {
    tags: ['Round'],
    description: 'Delete a round',
    operationId: 'deleteRound',
    parameters: [
      {
        name: '_id',
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
      404: {
        description: 'Not found',
      },
    },
  },
}
