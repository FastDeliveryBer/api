export default {
  delete: {
    tags: ['Round'],
    description: 'Supprimer une tournée en précisant son _id',
    operationId: 'deleteRound',
    parameters: [
      {
        name: '_id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      204: {
        description: 'Tournée supprimée',
      },
      400: {
        description: 'Impossible de supprimer la tournée',
      },
      404: {
        description: 'Tournée inconnue',
      },
    },
  },
}
