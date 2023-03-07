export type respAccountLogin = {
    name: string;
    password: string;
}
export type respAppLogin = {
    id: string;
    secret: string;
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
    login(): Promise<any>;
}

