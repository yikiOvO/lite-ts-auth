import { AjaxRpc } from 'lite-ts-ajax';
import { Header, RpcBase } from 'lite-ts-rpc';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';
import { LoginResponse } from './login-response';

export class AppLogin implements ILogin {
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
}