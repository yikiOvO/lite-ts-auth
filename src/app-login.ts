import { AjaxRpc, RpcBase } from 'lite-ts-ajax';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';

export type AccountLoginResponse = {
    id: string,
    accessToken: string,
    isAuth: boolean
}

export class appLogin implements ILogin {
    public constructor(
        private m_opt: BuildLoginOption,
        private m_Rpc: RpcBase
    ) { }

    public async login() {
        const resp = await this.m_Rpc?.callWithoutThrow<AccountLoginResponse>({
            route: '/account/login',
            body: { ...this.m_opt }
        })
        AjaxRpc.header['H-T'] = resp.data?.accessToken;
        return resp.data;
    }
}