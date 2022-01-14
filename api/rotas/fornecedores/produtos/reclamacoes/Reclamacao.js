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

    validar() {
        const campos = ['titulo', 'mensagem']

        campos.forEach((campo) => {
            const valor = this[campo]
            if(typeof valor !== 'string' || valor.length === 0){
                throw new Error(`deu erro no campo '${campo}'`)
            }
        })
    }

    async criar(){
        this.validar()
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

    apagar() {
        return Tabela.remover(this.id, this.produto)
    }

    async carregar(){
        const reclamacao = await Tabela.buscar(this.id, this.produto)
        this.titulo = reclamacao.titulo
        this.mensagem = reclamacao.mensagem
        this.dtCriacao = reclamacao.dtCriacao
        this.dtAtualizacao = reclamacao.dtAtualizacao
        this.versao = reclamacao.versao
    }

}

module.exports = Reclamacao