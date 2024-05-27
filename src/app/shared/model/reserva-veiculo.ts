export class ReservaVeiculo {
    vusNrId: number;
    vusDtDate: Date;
    veiNrId: number;
    usuNrId: number;

    constructor(
        vusNrId: number,
        vusDtDate: Date,
        veiNrId: number,
        usuNrId: number
    ) {
        this.vusNrId = vusNrId
        this.vusDtDate = vusDtDate
        this.veiNrId = veiNrId
        this.usuNrId = usuNrId
    }

}