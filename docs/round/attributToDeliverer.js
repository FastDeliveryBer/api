export default {
  post: {
    tags: ['Round'],
    description: 'Attribut a round to a deliverer',
    operationId: 'attributRound',
    parameters: [
      {
        name: 'round_id',
        in: 'path',
        required: true,
      },
      {
        name: 'deliverer_id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Round attribut successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
