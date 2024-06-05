export class Veiculo {
    veiNrId: number
    veiTxNome: string
    veiTxMarca: string
    veiTxTipo: string
    usuNrId: number

    constructor(
        veiNrId: number,
        veiTxNome: string,
        veiTxMarca: string,
        veiTxTipo: string,
        usuNrId: number
    ) {
        this.veiNrId = veiNrId
        this.veiTxNome = veiTxNome
        this.veiTxMarca = veiTxMarca
        this.veiTxTipo = veiTxTipo
        this.usuNrId = usuNrId
    }
}
