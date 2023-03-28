import { AjaxRpc } from 'lite-ts-ajax';
import { Header, RpcBase } from 'lite-ts-rpc';

import { BuildLoginOption } from './login-factory-base';
import { ILogin } from './i-login';
import { LoginResponse } from './login-response';

export abstract class NativeLoginBase implements ILogin {
    public static jsb: any;

    public constructor(
        protected opt: BuildLoginOption,
        protected rpc: RpcBase,
    ) { }

    public async login() {
        globalThis['loginCb'] = async <T extends LoginResponse>(e, r) => {
            delete globalThis['loginCb'];
            if (e)
                return new Error(e);

            const body = this.getLoginBody(r);
            const resp = await this.rpc.callWithoutThrow<T>({
                route: '/account/login',
                body: {
                    ...this.opt,
                    ...body
                }
            });
            if (!resp.err)
                AjaxRpc.header[Header.authToken] = resp.data?.accessToken;
            return resp.data;
        }

        if (!NativeLoginBase.jsb)
            throw new Error(`${this.constructor.name}.jsb未绑定`);

        return await NativeLoginBase.jsb.reflection.callStaticMethod(
            'JSBridgeManager',
            'emitEventLogin:',
            JSON.stringify({
                callback: 'globalThis.loginCb',
                loginPlatform: this.getLoginPlatform()
            })
        );
    }

    protected abstract getLoginBody(loginData: any): any;

    protected abstract getLoginPlatform(): string;

}
