export default {
  get: {
    tags: ['Deliverer'],
    description:
      "Récupérer l'ensemble des comptes livreur ou seulement un en particulier",
    operationId: 'getDeliverer',
    parameters: [
      {
        name: '_id',
        in: 'path',
        required: false,
      },
    ],
    responses: {
      200: {
        description: 'Livreur(s) récupéré(s)',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/deliverer',
            },
          },
        },
      },
      400: {
        description: 'Erreur',
      },
    },
  },
}
