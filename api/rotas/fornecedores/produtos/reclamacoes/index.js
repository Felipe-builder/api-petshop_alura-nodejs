const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaReclamacao')
const Reclamacao = require('./Reclamacao')
const Serializador = require('../../../../Serializador').SerializadorReclamacao

roteador.get('/', async (req, res) => {
    const resultados = await Tabela.listar(req.produto.id)
    const serializador = new Serializador(
        res.getHeader('Content-Type')   
    )
    res.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const idProduto = req.produto.id;
        const corpo = req.body;
        const dados = Object.assign({}, corpo, { produto: idProduto})
        const reclamacao = new Reclamacao(dados)
        await reclamacao.criar()
        res.status(201)
        const serializador = new Serializador(
            res.getHeader('Content-Type'),
            ['mensagem', 'dtCriacao', 'dtAtualizacao','versao']

        )
        res.send(
            serializador.serializar(reclamacao)
        )
    }catch(erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (req, res, proximo) => {
    try{
        const dados = {
            id: req.params.id,
            produto: req.produto.id
        }
        const reclamacao = new Reclamacao(dados)
        await reclamacao.apagar()
        res.status(204)
        res.end()
    } catch(erro) {
        proximo(erro)
    }
})

roteador.get('/:id', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            produto: req.produto.id
        }
        const reclamacao = new Reclamacao(dados)
        await reclamacao.carregar()
        const serializador = new Serializador(
            res.getHeader('Content-Type'),
            ['mensagem', 'dtCriacao', 'dtAtualizacao','versao']
        )
        res.send(
            serializador.serializar(reclamacao)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async (req, res, proximo) => {
    try {
        const dados = Object.assign(
            {},
            req.body,
            {
                id: req.params.id,
                produto: req.produto.id
            }
        )
        const reclamacao = new Reclamacao(dados)
        await reclamacao.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})
module.exports = roteador