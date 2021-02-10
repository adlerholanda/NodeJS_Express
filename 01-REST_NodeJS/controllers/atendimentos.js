const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        console.log(id)

        //res.send('OK')
        Atendimento.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        //console.log(req.body)
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
        //res.send('Você está na rota de atendimento e está realizando um POST!')
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}