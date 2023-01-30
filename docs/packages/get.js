export default {
  get: {
    tags: ['Package'],
    description: 'Get a package',
    operationId: 'getPackage',
    parameters: [
      {
        name: 'tracking_id',
        in: 'path',
        required: false,
        description:
          'Get a package by his tracking_id, if empty will return all the packages',
      },
    ],
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
