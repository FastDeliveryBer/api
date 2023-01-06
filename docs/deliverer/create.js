export default {
  post: {
    tags: ['Deliverer'],
    description: 'Create a deliverer',
    operationId: 'createDeliverer',
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
        description: 'Deliverer created successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
