export default {
  get: {
    tags: ['Parcel'],
    description:
      "Récupération un ou plusieurs colis, la récupération d'un colis si vide retournera l'ensemble des colis, sinon peut se faire via son _id ou alors son tracking_id",
    operationId: 'getParcel',
    parameters: [
      {
        name: 'tracking_id',
        in: 'path',
        required: false,
      },
      {
        name: '_id',
        in: 'path',
        required: false,
      },
    ],
    responses: {
      200: {
        description: 'Colis récupéré(s)',
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
