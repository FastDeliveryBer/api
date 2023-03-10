export default {
  round: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The unique id for the parcel',
        example: 'XYZ123456789',
      },
      schedule_date: {
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
      delivererid: {
        type: 'id',
        description: 'The current id of the deliverer that will make the round',
        example: '123415',
      },
    },
  },
  roundCreation: {
    type: 'object',
    properties: {
      schedule_date: {
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
      delivererid: {
        type: 'id',
        description: 'The current deliverer that will make the round',
        example: '123415',
      },
    },
  },
  roundUpdate: {
    type: 'object',
    properties: {
      schedule_date: {
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
