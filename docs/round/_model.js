export default {
  round: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The unique tracking id for the package',
        example: 'XYZ123456789',
      },
      schelude_date: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      date_started: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      date_ending: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      packages: {
        type: 'array',
        items: {
          $ref: '../packages/components/schemas/package',
        },
      },
      status: {
        type: 'string',
        description:
          'The current status of the package (e.g. "waiting", "in transit", "delivered")',
        example: 'waiting',
      },
      deliverer_id: {
        type: 'id',
        description: 'The current id of the deliverer that will make the round',
        example: '123415',
      },
    },
  },
  roundCreation: {
    type: 'object',
    properties: {
      schelude_date: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      date_started: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      date_ending: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      packages: {
        type: 'array of object',
        additionalProperties: {
          $ref: '#/components/schemas/package/properties',
        },
      },
      id_deliverer: {
        type: 'id',
        description: 'The current deliverer that will make the round',
        example: '123415',
      },
    },
  },
  roundUpdate: {
    type: 'object',
    properties: {
      schelude_date: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      date_started: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      date_ending: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      packages: {
        type: 'array of object',
        additionalProperties: {
          $ref: '#/components/schemas/package/properties',
        },
      },
      id_deliverer: {
        type: 'id',
        description: 'The current deliverer that will make the round',
        example: '123415',
      },
    },
  },
}
