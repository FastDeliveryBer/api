export default {
  post: {
    tags: ['Client'],
    description: 'Login for client',
    operationId: 'loginClient',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/clientLogin',
          },
          required: true,
        },
      },
    },
    responses: {
      200: {
        description: 'Login successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
