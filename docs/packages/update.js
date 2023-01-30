export default {
  put: {
    tags: ['Package'],
    description: 'Update information of a package',
    operationId: 'updatePackage',
    parameters: [
      {
        name: 'tracking_id',
        in: 'path',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/packageUpdate',
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
