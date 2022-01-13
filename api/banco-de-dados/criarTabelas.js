const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto'),
    require('../rotas/fornecedores/produtos/reclamacoes/ModeloTabelaReclamacao')
]
async function criarTabelas(){
    for(let contador = 0; contador < modelos.length; contador++){
        const modelo = modelos[contador]
        await modelo
            .sync()
            .then(() => console.log('Tabela criada com sucesso'))
            .catch(console.log)
    }
}

criarTabelas()