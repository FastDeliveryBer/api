export default {
  post: {
    tags: ['Admin'],
    description: 'Login for admin',
    operationId: 'loginAdmin',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/adminLogin',
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
