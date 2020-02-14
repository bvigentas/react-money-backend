const BillingCycle = require('./billingCycle')//Importa Modelo

//Criacao servicos REST
BillingCycle.methods(['get', 'post', 'put', 'delete'])
//Traz novo objeto ao update e faz validações criadas no Schema.
BillingCycle.updateOptions({ new: true, runValidators: true })

module.exports = BillingCycle