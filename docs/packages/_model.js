export default {
  package: {
    type: 'object',
    properties: {
      tracking_id: {
        type: 'string',
        description: 'The unique tracking id for the package',
        example: 'XYZ123456789',
      },
      delivery_date: {
        type: 'string',
        description: 'The date that the package is scheduled to be delivered',
        example: '07/07/2023',
      },
      address_expedition: {
        type: 'string',
        description: 'The address where the package is being shipped from',
        example: '123 Main Street, Anytown USA',
      },
      address_delivery: {
        type: 'string',
        description: 'The address where the package is being shipped to',
        example: '456 Maple Street, Anytown USA',
      },
      weight: {
        type: 'int',
        description: 'The weight of the package in pounds',
        example: '5',
      },
      width: {
        type: 'int',
        description: 'The width of the package in inches',
        example: '10',
      },
      length: {
        type: 'number',
        description: 'The length of the package in inches',
        example: '15',
      },
      height: {
        type: 'int',
        description: 'The height of the package in inches',
        example: '12',
      },
      fragile: {
        type: 'boolean',
        description: 'Indicates whether the package is fragile',
        example: true,
      },
      emergency: {
        type: 'boolean',
        description: 'Indicates whether the package is an emergency delivery',
        example: true,
      },
      status: {
        type: 'string',
        description:
          'The current status of the package (e.g. "waiting", "in transit", "delivered")',
        example: 'waiting',
      },
      proof_of_delivery: {
        type: 'string',
        description:
          'A link to the proof of delivery (e.g. an image of the signed receipt)',
        example: 'https://www.example.com/proof-of-delivery.png',
      },
      price: {
        type: 'number',
        description: 'The price of the package based on the weight',
        example: '10.50',
      },
      is_payed: {
        type: 'boolean',
        description: 'Indicates whether the package was payed',
        example: true,
      },
    },
  },
  packageForClient: {
    type: 'object',
    properties: {
      client_id: {
        type: 'string',
        description:
          'The unique tracking id for the client who create the package',
        example: 'XYZ123456789',
      },
      address_expedition: {
        type: 'string',
        description: 'The address where the package is being shipped from',
        example: '123 Main Street, Anytown USA',
      },
      address_delivery: {
        type: 'string',
        description: 'The address where the package is being shipped to',
        example: '456 Maple Street, Anytown USA',
      },
      weight: {
        type: 'int',
        description: 'The weight of the package in pounds',
        example: '5',
      },
      width: {
        type: 'int',
        description: 'The width of the package in inches',
        example: '10',
      },
      length: {
        type: 'number',
        description: 'The length of the package in inches',
        example: '15',
      },
      height: {
        type: 'int',
        description: 'The height of the package in inches',
        example: '12',
      },
      fragile: {
        type: 'boolean',
        description: 'Indicates whether the package is fragile',
        example: true,
      },
      emergency: {
        type: 'boolean',
        description: 'Indicates whether the package is an emergency delivery',
        example: true,
      },
    },
  },
}
