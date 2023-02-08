export default {
  post: {
    tags: ['Round'],
    description: 'Créer une tournée',
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
      201: {
        description: 'Tournée créé',
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
