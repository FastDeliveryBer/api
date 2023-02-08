export default {
  delete: {
    tags: ['Customer'],
    description: 'Supprimer un compte client',
    operationId: 'deleteCustomer',
    parameters: [
      {
        name: '_id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      204: {
        description: 'Compte client supprimé',
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
