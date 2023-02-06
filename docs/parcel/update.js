export default {
  patch: {
    tags: ['Parcel'],
    description: 'Update information of a parcel',
    operationId: 'updateParcel',
    parameters: [
      {
        name: 'tracking_id',
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
        description: 'Parcel updated successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
