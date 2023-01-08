export default {
  delete: {
    tags: ['Deliverer'],
    description: 'Delete a deliverer with his ID',
    operationId: 'deleteDeliverer',
    parameters: [
      {
        name: 'deliverer_id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Deliverer deleted successfully',
      },
      400: {
        description: 'Error',
      },
    },
  },
}
