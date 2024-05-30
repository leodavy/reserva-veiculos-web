export class UsuarioPerfil {
    uspUsuarioPerfilKey: {
        usuNrId: number;
        perNrId: number;
    };

    constructor(uspUsuarioPerfilKey: { usuNrId: number; perNrId: number }) {
        this.uspUsuarioPerfilKey = uspUsuarioPerfilKey;
    }
}
