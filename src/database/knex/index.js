const config = require('../../../knexfile')
const knex = require('knex')

const connectionknex = knex(config.development)

module.exports = connectionknex