export default {
  delete: {
    tags: ['Customer'],
    description: 'Delete information of a customer',
    operationId: 'deleteCustomer',
    parameters: [
      {
        name: '_id',
        in: 'path',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/customer',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Customer delete successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
