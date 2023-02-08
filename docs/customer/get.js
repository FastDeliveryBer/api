export default {
  get: {
    tags: ['Customer'],
    description: 'Récupérer un ou plusieur compte client',
    operationId: 'getCustomer',
    parameters: [
      {
        name: '_id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Customer get successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/customerGet',
            },
          },
        },
      },
      400: {
        description: 'Error',
      },
      404: {
        description: 'Not Found',
      },
    },
  },
}
