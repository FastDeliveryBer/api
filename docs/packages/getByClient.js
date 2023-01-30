export default {
  get: {
    tags: ['Package'],
    description: 'Get a package for a client',
    operationId: 'getPackageByClient',
    parameters: [
      {
        name: 'client_id',
        in: 'path',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/packageGetByClient',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Package get successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
