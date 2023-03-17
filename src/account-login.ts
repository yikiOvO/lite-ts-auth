import { AjaxRpc } from 'lite-ts-ajax';
import { Header, RpcBase } from 'lite-ts-rpc';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';
import { LoginResponse } from './login-response';

export type AccountVerify = {
    idCard: string;
    realName: string;
    userID: string;
}

export class AccountLogin implements ILogin {
    public constructor(
        private m_Opt: BuildLoginOption,
        private m_Rpc: RpcBase,
    ) { }

    public async login<T extends LoginResponse>() {
        const resp = await this.m_Rpc.callWithoutThrow<T>({
            route: '/account/login',
            body: { ...this.m_Opt }
        });
        if (!resp.err)
            AjaxRpc.header[Header.authToken] = resp.data?.accessToken;
        return resp.data;
    }

    public async register() {
        const resp = await this.m_Rpc?.callWithoutThrow<number>({
            route: '/account/register',
            body: { ...this.m_Opt }
        })
        return resp.err;
    }

    public async verify(v: AccountVerify) {
        const resp = await this.m_Rpc?.callWithoutThrow<number>({
            route: '/account/verify',
            body: v
        })
        return resp.err;
    }
}