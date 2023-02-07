export default {
  post: {
    tags: ['Deliverer'],
    description: 'Créer un compte pour un livreur',
    operationId: 'createDeliverer',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/delivererCreation',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Livreur créé',
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
    },
  },
}
