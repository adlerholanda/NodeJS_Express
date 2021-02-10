const moment = require('moment')
const connection = require('../infrastructure/connection')

class Atendimento {
    adiciona (atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.client.length >= 4

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'client',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos quatro caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = `INSERT INTO tb_atendimentos SET ?`
    
            connection.query(sql, atendimentoDatado, (error, results) => {
                if(error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res) {
        const sql = `SELECT * FROM tb_atendimentos`

        connection.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM  tb_atendimentos WHERE id=${id}`

        connection.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        }
        const sql = `UPDATE tb_atendimentos SET ? WHERE id=?`

        connection.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = `DELETE FROM tb_atendimentos WHERE id=?`
        
        connection.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento