export default {
  get: {
    tags: ['Round'],
    description: 'Récupérer une ou plusieur tournée',
    operationId: 'getRound',
    parameters: [
      {
        name: '_id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Tournée(s) récupérée(s)',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/round',
            },
          },
        },
      },
      400: {
        description: 'Erreur',
      },
      404: {
        description: 'Not found',
      },
    },
  },
}
