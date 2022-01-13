const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaReclamacao')
const Reclamacao = require('./Reclamacao')

roteador.get('/', async (req, res) => {
    const resultados = await Tabela.listar(req.params.idProduto)
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, res) => {
    try {
        const idProduto = req.params.idProduto;
        const corpo = req.body;
        const dados = Object.assign({}, corpo, { produto: idProduto})
        const reclamacao = new Reclamacao(dados)
        await reclamacao.criar()
        res.status(201)
        res.send(
            JSON.stringify(reclamacao)
        )
    }catch(erro) {
        res.send(
            JSON.stringify(erro)
        )
    }
})

module.exports = roteador