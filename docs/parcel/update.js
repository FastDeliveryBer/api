export default {
  patch: {
    tags: ['Parcel'],
    description: "Modifier les informations d'un colis",
    operationId: 'updateParcel',
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
            $ref: '#/components/schemas/parcelUpdate',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Colis modifié',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/parcel',
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
