export interface JwtPayload {
    payload: {
        usuNrId: number;
        usuTxNome: string;
        roles: string[];
    };
}
