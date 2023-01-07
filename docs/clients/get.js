export default {
  get: {
    tags: ['Client'],
    description: 'Get a client',
    operationId: 'getClient',
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
        description: 'Client get successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/client',
            },
          },
        },
      },
      400: {
        description: 'Error',
      },
    },
  },
}
