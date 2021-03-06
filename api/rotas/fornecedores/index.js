const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require ('../../Serializador').SerializadorFornecedor
const TabelaProduto = require('./produtos/TabelaProduto')

roteador.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET', 'POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type'),
        ['empresa']
    )
    res.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req , res, proximo) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        res.status(201)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['empresa']
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:idFornecedor', async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.status(200)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['empresa', 'email', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    } catch (erro) {
        proximo(erro)
    } 
})

roteador.options('/:idFornecedor', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET', 'PUT', 'DELETE')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

roteador.put('/:idFornecedor', async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

roteador.post('/:idFornecedor/calcular-reposicao-de-estoque', async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        const produtos = await TabelaProduto.listar(fornecedor.id, {estoque: 0})
        res.status(200)
        res.send({
            mensagem: `${produtos.length} precisam de reposi????o do estoque`
        })
    } catch (erro) {
        proximo(erro)
    }
})

const roteadorProduto = require('./produtos')

const verificarFornecedor = async (req, res, proximo) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id})
        await fornecedor.carregar()
        req.fornecedor = fornecedor
        proximo()
    } catch (erro) {
        proximo(erro)
    }
}

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProduto)

module.exports = roteador
