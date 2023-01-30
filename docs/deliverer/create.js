export default {
  post: {
    tags: ['Deliverer'],
    description: 'Create a account for a deliverer',
    operationId: 'createDeliverer',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/delivererCreation',
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
