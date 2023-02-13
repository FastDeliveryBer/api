export default {
  delete: {
    tags: ['Deliverer'],
    description: 'Supprimer un livreur en passant en paramètre son id',
    operationId: 'deleteDeliverer',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
      },
    ],
    responses: {
      204: {
        description: 'Livreur supprimé',
      },
      400: {
        description: 'Erreur',
      },
    },
  },
}
