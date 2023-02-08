export default {
  patch: {
    tags: ['Round'],
    description: "Modifier les informations d'une tournée",
    operationId: 'updateRound',
    parameters: [
      {
        name: '_id',
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
        description: 'Impossible de modifier la tournée',
      },
      404: {
        description: 'Tournée inconnue',
      },
    },
  },
}
