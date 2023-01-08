export default {
  post: {
    tags: ['Package'],
    description: 'Create a package for a client',
    operationId: 'createPackage',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/packageCreationForClient',
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
