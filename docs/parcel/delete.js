export default {
  delete: {
    tags: ['Parcel'],
    description: 'Supprimer un colis',
    operationId: 'deleteParcel',
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
            $ref: '#/components/schemas/parcel',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Colis supprimée',
      },
      400: {
        description: 'Impossible de supprimer le colis',
      },
    },
  },
}
