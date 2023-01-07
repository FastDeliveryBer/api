export default {
  post: {
    tags: ['Client'],
    description: 'Create a client',
    operationId: 'createClient',
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
        description: 'Client created successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
