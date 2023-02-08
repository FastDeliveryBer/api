export default {
  round: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: 'The unique id for the parcel',
        example: 'XYZ123456789',
      },
      schelude_date: {
        type: 'string',
        description: 'The date that the parcel is scheduled to be delivered',
        example: '07/07/2023',
      },
      parcels: {
        type: 'array',
        items: {
          $ref: '../parcel/components/schemas/parcel',
        },
      },
      status: {
        type: 'string',
        description:
          'The current status of the parcel (e.g. "waiting", "in transit", "delivered")',
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
        description: 'The date that the parcel is scheduled to be delivered',
        example: '07/07/2023',
      },
      parcel: {
        type: 'array of object',
        additionalProperties: {
          $ref: '#/components/schemas/parcel/properties',
        },
      },
      deliverer_id: {
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
        description: 'The date that the parcel is scheduled to be delivered',
        example: '07/07/2023',
      },
      parcel: {
        type: 'array of object',
        additionalProperties: {
          $ref: '#/components/schemas/parcel/properties',
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
