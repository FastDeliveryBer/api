export default {
  delete: {
    tags: ['Package'],
    description: 'Delete a package for a client',
    operationId: 'deletePackageByClient',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/packageDeleteByClient',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Package delete successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
