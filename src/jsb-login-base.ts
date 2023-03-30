import { AjaxRpc } from 'lite-ts-ajax';
import { Header, RpcBase } from 'lite-ts-rpc';

import { BuildLoginOption } from './login-factory-base';
import { ILogin } from './i-login';
import { LoginResponse } from './login-response';

export type JsbLoginResponse = Partial<{
    identityToken: string,
    idToken: string,
}>

export abstract class JsbLoginBase<T> implements ILogin {
    public static jsb: any;

    public constructor(
        protected opt: BuildLoginOption,
        protected rpc: RpcBase,
    ) { }

    public async login() {
        return new Promise<any>((s, f) => {
            globalThis['loginCb'] = async (e: string, r: T) => {
                delete globalThis['loginCb'];
                if (e)
                    return f(e);

                const body = this.getLoginBody(r);
                const resp = await this.rpc.callWithoutThrow<LoginResponse>({
                    route: '/account/login',
                    body: {
                        ...body
                    }
                });
                if (!resp.err)
                    AjaxRpc.header[Header.authToken] = resp.data?.accessToken;
                s(resp.data);
            }

            if (!JsbLoginBase.jsb)
                return f(`${this.constructor.name}.jsb未绑定`);

            this.getLoginFunc();
        })
    }

    protected abstract getLoginBody(loginData: T): any;

    protected abstract getLoginFunc(): void;
}
