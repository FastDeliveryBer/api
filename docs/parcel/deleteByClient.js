export default {
  delete: {
    tags: ['Parcel'],
    description: 'Delete a parcel for a client',
    operationId: 'deleteParcelByClient',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/parcelDeleteByClient',
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
