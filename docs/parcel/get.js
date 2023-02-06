export default {
  get: {
    tags: ['Parcel'],
    description: 'Get a parcel',
    operationId: 'getParcel',
    parameters: [
      {
        name: 'tracking_id',
        in: 'path',
        required: false,
        description:
          'Get a parcel by his tracking_id, if empty will return all the parcel',
      },
    ],
    responses: {
      200: {
        description: 'Parcel get successfully',
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
