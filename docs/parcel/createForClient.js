export default {
  post: {
    tags: ['Parcel'],
    description: 'Create a parcel for a client',
    operationId: 'createParcelByClient',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/parcelCreationForClient',
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
