export default {
  post: {
    tags: ['Package'],
    description: 'Create a package',
    operationId: 'createPackage',
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
        description: 'Package created successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
