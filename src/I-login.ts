export type AccountLogin = {
    name: string;
    password: string;
}
export type AccountLoginResponse = {
    id: string,
    accessToken: string,
    isAuth: boolean
}
export type AccountRegister = {
    name: string;
    password: string;
}
export type AccountVerify = {
    idCard: string;
    realName: string;
    userID: string;
}

export interface ILogin {
    login(v: any): Promise<any>;
    register(v: AccountRegister): Promise<number>;
    verify(v: AccountVerify): Promise<number>;
}