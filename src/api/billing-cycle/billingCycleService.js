const BillingCycle = require('./billingCycle')//Importa Modelo
const errorhandler = require('../common/errorhandler')

//Criacao servicos REST
BillingCycle.methods(['get', 'post', 'put', 'delete'])
//Traz novo objeto ao update e faz validações criadas no Schema.
BillingCycle.updateOptions({ new: true, runValidators: true })
BillingCycle.after('post', errorhandler).after('put', errorhandler)

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({erros: [error]})
        } else {
            res.json({value})
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{ 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, { 
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, { 
        $project: {_id: 0, credit: 1, debt: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports = BillingCycle