const Modelo = require('./ModeloTabelaReclamacao')

module.exports = {
    listar(idProduto) {
        return Modelo.findAll({
            where: {
                produto: idProduto
            }
        })
    },
    async inserir(dados){
        return Modelo.create(dados)
    }
}