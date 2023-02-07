export default {
  delete: {
    tags: ['Deliverer'],
    description: 'Supprimer un livreur en passant en paramètre son _id',
    operationId: 'deleteDeliverer',
    parameters: [
      {
        name: '_id',
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
