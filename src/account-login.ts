import { AjaxRpc, RpcBase, RpcCallOption } from 'lite-ts-ajax';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';

export type AccountLoginResponse = {
    id: string,
    accessToken: string,
    isAuth: boolean
}

export type AccountVerify = {
    idCard: string;
    realName: string;
    userID: string;
}

export class AccountLogin implements ILogin {
    public constructor(
        private m_Opt: BuildLoginOption,
        private m_Rpc: RpcBase
    ) { }

    public async login() {
        const resp = await this.m_Rpc?.callWithoutThrow<AccountLoginResponse>({
            method: 'POST',
            route: '/account/login',
            body: { ...this.m_Opt }
        } as RpcCallOption)

        if (!resp.err && resp.data)
            AjaxRpc.header['H-T'] = resp.data.accessToken;
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
            body: {
                idCard: v.idCard,
                realName: v.realName,
                userID: v.userID
            }
        })
        return resp.err;
    }
}