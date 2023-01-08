export default {
  put: {
    tags: ['Package'],
    description: 'Update a package for a client',
    operationId: 'updatePackageByClient',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/packageUpdateForClient',
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
