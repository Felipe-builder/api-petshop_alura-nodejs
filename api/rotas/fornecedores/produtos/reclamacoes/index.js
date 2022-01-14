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

roteador.delete('/:id', async (req, res) => {
    try{
        const dados = {
            id: req.params.id,
            produto: req.params.idProduto
        }
        const reclamacao = new Reclamacao(dados)
        await reclamacao.apagar()
        res.status(204)
        res.end()
    } catch(erro) {
        res.send(
            JSON.stringify(erro)
        )
    }
})

roteador.get('/:id', async (req, res) => {
    try {
        const dados = {
            id: req.params.id,
            produto: req.params.idProduto
        }
        console.log('getPorid')
        console.log(JSON.stringify(dados))
        const reclamacao = new Reclamacao(dados)
        await reclamacao.carregar()
        res.status(200)
        res.send(
            JSON.stringify(reclamacao)
        )
    } catch (erro) {
        res.status(404)
        res.send(
            JSON.stringify(erro)
        )
    }
})

module.exports = roteador