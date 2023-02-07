export default {
  patch: {
    tags: ['Customer'],
    description: 'Update information of a client',
    operationId: 'updateClient',
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
            $ref: '#/components/schemas/client',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Client updated successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
