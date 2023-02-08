export default {
  post: {
    tags: ['Parcel'],
    description: 'Créer un colis',
    operationId: 'createParcel',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/parcelCreation',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Colis créé',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/parcel',
            },
          },
        },
      },
      400: {
        description: 'Impossible de créer le colis',
      },
    },
  },
}
