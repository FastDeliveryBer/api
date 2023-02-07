export default {
  delete: {
    tags: ['Parcel'],
    description: 'Delete a parcel',
    operationId: 'deleteParcel',
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
            $ref: '#/components/schemas/parcel',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Parcel delete successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
