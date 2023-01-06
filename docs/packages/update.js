export default {
  post: {
    tags: ['Package'],
    description: 'Update information of a package',
    operationId: 'updatePackage',
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
        description: 'Package updated successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
