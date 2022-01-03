class NaoEncontrado extends Error {
    constructor (campo) {
        super(`${campo} não foi encontrado!`)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado