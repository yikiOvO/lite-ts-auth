export * from './lite-service-login-server';


export type AccountRegister = {
    name: string;
    password: string;
}
export interface IAccountRegister {
    register(v: AccountRegister): Promise<number>;
}

export type AccountVerify = {
    idCard: string;
    realName: string;
    userID: string;
}
export interface IAccountVerify {
    verify(v: AccountVerify): Promise<any>;
}