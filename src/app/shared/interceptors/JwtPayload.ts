export interface JwtPayload {
    sub: string;
    iss: string;
    exp: number;
    payload: {
      usuNrId: number;
      usuTxNome: string;
      roles: string[];
    };
  }
  