const express = require('express')

module.exports = function(server) {

    //Sempre que URL inicia com /api direciona para o router
    const router = express.Router()
    server.use('/api', router)

    //Cria rotas dos services
    const BillingCycle = require('../api/billing-cycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles')

}