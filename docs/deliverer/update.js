export default {
  patch: {
    tags: ['Deliverer'],
    description: 'Update information of a deliverer',
    operationId: 'updateDeliverer',
    parameters: [
      {
        name: 'deliverer_id',
        in: 'path',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/delivererUpdate',
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
