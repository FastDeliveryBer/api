export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'FastDeliveryBer API',
    description: 'FastDeliveryBer API Rest',
    contact: {
      name: 'FastDeliveryBer Contact',
      email: 'info@fdb.fr',
      url: 'https://fdb.fr',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local server',
    },
  ],
}