const BillingCycle = require('./billingCycle')//Importa Modelo

//Criacao servicos REST
BillingCycle.methods(['get', 'post', 'put', 'delete'])
//Traz novo objeto ao update e faz validações criadas no Schema.
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({erros: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = BillingCycle