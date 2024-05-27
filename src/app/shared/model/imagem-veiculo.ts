export class ImagemVeiculo {
    imvNrId: number;
    imvTxNome: string;
    imvBtBytes: Blob;
    imvTxExtensao: string;
    veiNrId: number;

    constructor(
        imvNrId: number,
        imvTxNome: string,
        imvBtBytes: Blob,
        imvTxExtensao: string,
        veiNrId: number
    ) {
        this.imvNrId = imvNrId
        this.imvTxNome = imvTxNome
        this.imvBtBytes = imvBtBytes
        this.imvTxExtensao = imvTxExtensao
        this.veiNrId = veiNrId
    }
}