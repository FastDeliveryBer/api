export default {
  patch: {
    tags: ['Deliverer'],
    description:
      "Modifier les informations d'un livreur, le corprs de la requêtes doit regrouper une ou plusieurs informations l'ensemble des informations autorisées sont affiché dans le schéma",
    operationId: 'updateDeliverer',
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
            $ref: '#/components/schemas/delivererUpdate',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Livreur modifié',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/delivererUpdate',
            },
          },
        },
      },
      400: {
        description: 'Erreur',
      },
      404: {
        description: 'Livreur inconnu',
      },
    },
  },
}
