export default {
  put: {
    tags: ['Parcel'],
    description: 'Update a parcel for a client',
    operationId: 'updateParcelByClient',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/parcelUpdateForClient',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Parcel created successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
