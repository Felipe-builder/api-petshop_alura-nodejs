const Tabela = require('./TabelaReclamacao')

class Reclamacao {
    constructor({id, titulo, mensagem, produto, dtCriacao, dtAtualizacao, versao}) {
        this.id = id
        this.titulo = titulo
        this.mensagem = mensagem
        this.produto = produto
        this.dtCriacao = dtCriacao
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar(){
        const resultado = await Tabela.inserir({
            titulo: this.titulo,
            mensagem: this.mensagem,
            produto: this.produto
        })

        this.id = resultado.id
        this.dtCriacao = resultado.dtCriacao
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
    }

}

module.exports = Reclamacao