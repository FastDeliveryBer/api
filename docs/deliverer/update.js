export default {
  post: {
    tags: ['Deliverer'],
    description: 'Update information of a deliverer',
    operationId: 'updateDeliverer',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/deliverer',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Deliverer updated successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
