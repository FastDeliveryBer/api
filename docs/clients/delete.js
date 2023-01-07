export default {
  delete: {
    tags: ['Client'],
    description: 'Update information of a client',
    operationId: 'updateClient',
    parameters: [],
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
