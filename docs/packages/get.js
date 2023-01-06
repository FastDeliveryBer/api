export default {
  get: {
    tags: ['Package'],
    description: 'Get a package',
    operationId: 'getPackage',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/package',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Package get successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/package',
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
