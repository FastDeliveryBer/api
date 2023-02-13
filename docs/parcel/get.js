export default {
  get: {
    tags: ['Parcel'],
    description:
      "Récupération un ou plusieurs colis, la récupération d'un colis si vide retournera l'ensemble des colis, sinon peut se faire via son id ou alors son trackingid",
    operationId: 'getParcel',
    parameters: [
      {
        name: 'trackingid',
        in: 'path',
        required: false,
      },
      {
        name: 'id',
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
