export default {
  parcel: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The unique id for the parcel',
        example: 'XYZ123456789',
      },
      trackingid: {
        type: 'string',
        description: 'The unique tracking id for the parcel',
        example: 'XYZ12345678-sdsdsd9-2VDG362B_2426GS6',
      },
      customerid: {
        type: 'string',
        description: 'The unique tracking id for the client',
        example: 'XYZ123456789',
      },
      delivery_date: {
        type: 'string',
        description: 'The date that the parcel is scheduled to be delivered',
        example: '07/07/2023',
      },
      address_expedition: {
        type: 'string',
        description: 'The address where the parcel is being shipped from',
        example: '123 Main Street, Anytown USA',
      },
      address_delivery: {
        type: 'string',
        description: 'The address where the parcel is being shipped to',
        example: '456 Maple Street, Anytown USA',
      },
      weight: {
        type: 'int',
        description: 'The weight of the parcel in pounds',
        example: '5',
      },
      width: {
        type: 'int',
        description: 'The width of the parcel in inches',
        example: '10',
      },
      length: {
        type: 'number',
        description: 'The length of the parcel in inches',
        example: '15',
      },
      height: {
        type: 'int',
        description: 'The height of the parcel in inches',
        example: '12',
      },
      is_fragile: {
        type: 'boolean',
        description: 'Indicates whether the parcel is fragile',
        example: true,
      },
      is_emergency: {
        type: 'boolean',
        description: 'Indicates whether the parcel is an emergency delivery',
        example: true,
      },
      status: {
        type: 'string',
        description:
          'The current status of the parcel (e.g. "waiting", "in transit", "delivered")',
        example: 'waiting',
      },
      proof_of_delivery: {
        type: 'buffer',
        description:
          'A link to the proof of delivery (e.g. an image of the signed receipt)',
        example: 'https://www.example.com/proof-of-delivery.png',
      },
      price: {
        type: 'number',
        description: 'The price of the parcel based on the weight',
        example: '10.50',
      },
    },
  },
  parcelCreation: {
    type: 'object',
    properties: {
      customerid: {
        type: 'string',
        description: 'The unique tracking id for the client',
        example: 'XYZ123456789',
      },
      address_expedition: {
        type: 'string',
        description: 'The address where the parcel is being shipped from',
        example: '123 Main Street, Anytown USA',
      },
      address_delivery: {
        type: 'string',
        description: 'The address where the parcel is being shipped to',
        example: '456 Maple Street, Anytown USA',
      },
      weight: {
        type: 'int',
        description: 'The weight of the parcel in pounds',
        example: '5',
      },
      width: {
        type: 'int',
        description: 'The width of the parcel in inches',
        example: '10',
      },
      length: {
        type: 'number',
        description: 'The length of the parcel in inches',
        example: '15',
      },
      height: {
        type: 'int',
        description: 'The height of the parcel in inches',
        example: '12',
      },
      price: {
        type: 'number',
        description: 'The price of the parcel based on the weight',
        example: '10.50',
      },
      is_fragile: {
        type: 'boolean',
        description: 'Indicates whether the parcel is fragile',
        example: true,
      },
      is_emergency: {
        type: 'boolean',
        description: 'Indicates whether the parcel is an emergency delivery',
        example: true,
      },
    },
  },
  parcelUpdate: {
    type: 'object',
    properties: {
      customerid: {
        type: 'string',
        description:
          'The unique tracking id for the client who create the parcel, can be null if not created by a client',
        example: 'XYZ123456789',
      },
      address_expedition: {
        type: 'string',
        description: 'The address where the parcel is being shipped from',
        example: '123 Main Street, Anytown USA',
      },
      address_delivery: {
        type: 'string',
        description: 'The address where the parcel is being shipped to',
        example: '456 Maple Street, Anytown USA',
      },
      weight: {
        type: 'int',
        description: 'The weight of the parcel in pounds',
        example: '5',
      },
      width: {
        type: 'int',
        description: 'The width of the parcel in inches',
        example: '10',
      },
      length: {
        type: 'number',
        description: 'The length of the parcel in inches',
        example: '15',
      },
      height: {
        type: 'int',
        description: 'The height of the parcel in inches',
        example: '12',
      },
      fragile: {
        type: 'boolean',
        description: 'Indicates whether the parcel is fragile',
        example: true,
      },
      emergency: {
        type: 'boolean',
        description: 'Indicates whether the parcel is an emergency delivery',
        example: true,
      },
      proof_of_delivery: {
        type: 'string',
        description:
          'A link to the proof of delivery (e.g. an image of the signed receipt)',
        example: 'https://www.example.com/proof-of-delivery.png',
      },
    },
  },
}
