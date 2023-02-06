export default {
  post: {
    tags: ['Parcel'],
    description: 'Create a parcel',
    operationId: 'createParcel',
    parameters: [],
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
        description: 'Parcel created successfully',
      },
      400: {
        description: 'Error',
      },
      404: {
        description: 'Parcel unknow',
      },
    },
  },
}
