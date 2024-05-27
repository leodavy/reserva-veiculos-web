export class Veiculo {
    veiNrId: number
    veiTxNome: string
    veiTxMarca: string
    veiTxTipo: string

    constructor(
        veiNrId: number,
        veiTxNome: string,
        veiTxMarca: string,
        veiTxTipo: string
    ) {
        this.veiNrId = veiNrId
        this.veiTxNome = veiTxNome
        this.veiTxMarca = veiTxMarca
        this.veiTxTipo = veiTxTipo
    }
}
