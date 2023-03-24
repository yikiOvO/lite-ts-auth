import { AjaxRpc } from 'lite-ts-ajax';
import { RpcBase, Header } from 'lite-ts-rpc';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';
import { LoginResponse } from './login-response';

export type AppleLoginResponse = {
    identityToken: string,
}
export class AppleLogin implements ILogin {
    public static jsb: any;

    public constructor(
        private m_Opt: BuildLoginOption,
        private m_Rpc: RpcBase,
    ) { }

    public async login() {
        globalThis['loginCb'] = async <T extends LoginResponse>(e, r: AppleLoginResponse) => {
            globalThis['loginCb'] = undefined;
            if (e)
                return new Error(e);

            const resp = await this.m_Rpc.callWithoutThrow<T>({
                route: '/account/login',
                body: {
                    ...this.m_Opt,
                    ...{ appleLogin: { identityToken: r.identityToken } }
                }
            });
            if (!resp.err)
                AjaxRpc.header[Header.authToken] = resp.data?.accessToken;
            return resp.data;
        }

        let data: any = {};
        data.callback = 'globalThis.loginCb';
        data.loginPlatform = 'Apple';
        data = JSON.stringify(data);

        try {
            if (!AppleLogin.jsb)
                throw new Error('GoogleLogin.jsb未绑定');
            const resp = await AppleLogin.jsb.reflection.callStaticMethod('JSBridgeManager', "emitEventLogin:", data);
            return resp;
        } catch (error) {
            throw new Error(error);
        }
    }
}

