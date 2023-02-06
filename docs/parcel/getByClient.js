export default {
  get: {
    tags: ['Parcel'],
    description: 'Get a parcel for a client',
    operationId: 'getParcelByClient',
    parameters: [
      {
        name: 'client_id',
        in: 'path',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/parcelGetByClient',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Parcel get successfully',
      },
      400: {
        description: 'Error',
      },
      404: {
        description: 'Not found',
      },
    },
  },
}
