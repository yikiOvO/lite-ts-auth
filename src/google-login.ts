import { AjaxRpc, RpcBase } from 'lite-ts-ajax';
import { Header } from 'lite-ts-rpc';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';
import { LoginResponse } from './login-response';

export type GoogleLoginResponse = {
    accessToken: string,
}
export class GoogleLogin implements ILogin {
    public static jsb: any;

    public constructor(
        private m_Opt: BuildLoginOption,
        private m_Rpc: RpcBase,
    ) { }

    public async login() {
        globalThis['loginCb'] = async <T extends LoginResponse>(e) => {
            if (e)
                return new Error(e);

            const resp = await this.m_Rpc.callWithoutThrow<T>({
                route: '/account/login',
                body: { ...this.m_Opt }
            });
            if (!resp.err)
                AjaxRpc.header[Header.authToken] = resp.data?.accessToken;
            return resp.data;
        }

        const data: any = {};
        data.callback = 'globalThis.loginCb';
        try {
            if (!GoogleLogin.jsb)
                throw new Error('GoogleLogin.jsb未绑定');
            const resp = await GoogleLogin.jsb.reflection.callStaticMethod('com/ily/core/jsb/JSBridgeManager', 'googleLogin', '(Ljava/lang/String;)V', data);
            return resp;
        } catch (error) {
            throw new Error(error);
        }
    }
}