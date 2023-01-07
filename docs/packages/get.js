export default {
  get: {
    tags: ['Package'],
    description: 'Get a package',
    operationId: 'getPackage',
    parameters: [
      {
        name: 'tracking_id',
        in: 'path',
        /* schema: {
          $ref: '#/components/schemas/id',
        }, */
        required: true,
        description: 'Get a package by his tracking_id',
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
