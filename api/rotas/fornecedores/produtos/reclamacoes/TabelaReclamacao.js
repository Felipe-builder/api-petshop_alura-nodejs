const NaoEncontrado = require('../../../../erros/NaoEncontrado')
const Modelo = require('./ModeloTabelaReclamacao')

module.exports = {
    listar(idProduto) {
        return Modelo.findAll({
            where: {
                produto: idProduto
            },
            raw: true
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
        const reclamacao = await Modelo.findOne({
            where: {
                id: idReclamacao,
                produto: idProduto
            },
            raw: true
        })

        if(!reclamacao) {
            throw new NaoEncontrado('Reclamação')
        }

        return reclamacao
    },
    atualizar(dadosDaReclamacao, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDaReclamacao
            }
        )
    }


}