export default {
  post: {
    tags: ['Captain'],
    description: 'Login for captain',
    operationId: 'loginCaptain',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/captainLogin',
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
