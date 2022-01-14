const Modelo = require('./ModeloTabelaReclamacao')

module.exports = {
    listar(idProduto) {
        return Modelo.findAll({
            where: {
                produto: idProduto
            }
        })
    },
    inserir(dados){
        return Modelo.create(dados)
    },
    remover(idReclamacao, idProduto){
        return Modelo.destroy({
            where: {
                id: idReclamacao,
                produto: idProduto
            }
        })
    },
    async buscar(idReclamacao, idProduto) {
        const reclamacao = Modelo.findOne({
            where: {
                id: idReclamacao,
                produto: idProduto
            }
        })

        if(!reclamacao) {
            throw new Error('Reclamação não encontrada!')
        }

        return reclamacao
    }
}