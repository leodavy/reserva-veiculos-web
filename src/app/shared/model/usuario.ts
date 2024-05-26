export class Usuario {
  usuNrId: number;
  usuTxNome: string;
  usuTxLogin: string;
  usuTxSenha: string;
  roles: [];

  constructor(data: Partial<Usuario> = {}) {
    this.usuNrId = data.usuNrId || 0;
    this.usuTxNome = data.usuTxNome || '';
    this.usuTxLogin = data.usuTxLogin || '';
    this.usuTxSenha = data.usuTxSenha || '';
    this.roles = data.roles || [];
  }


}
