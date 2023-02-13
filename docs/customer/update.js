export default {
  patch: {
    tags: ['Customer'],
    description: "Modifier les informations d'un client",
    operationId: 'updateClient',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/customerUpdate',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Compte client modifié',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/customerGet',
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
