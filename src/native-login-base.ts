import { AjaxRpc } from "lite-ts-ajax";
import { Header, RpcBase } from "lite-ts-rpc";

import { BuildLoginOption } from "./login-factory-base";
import { ILogin } from "./i-login";
import { LoginResponse } from "./login-response";

export abstract class NativeLoginBase implements ILogin {
    public static jsb: any;

    public constructor(
        protected m_Opt: BuildLoginOption,
        protected m_Rpc: RpcBase,
    ) { }

    protected abstract getLoginBody(loginData: any): any;

    protected abstract getLoginPlatform(): string;

    public async login() {
        globalThis['loginCb'] = async <T extends LoginResponse>(e, r) => {
            delete globalThis['loginCb'];
            if (e)
                return new Error(e);

            const body = this.getLoginBody(r);
            const resp = await this.m_Rpc.callWithoutThrow<T>({
                route: '/account/login',
                body: {
                    ...this.m_Opt,
                    ...body
                }
            });
            if (!resp.err)
                AjaxRpc.header[Header.authToken] = resp.data?.accessToken;
            return resp.data;
        }

        try {
            if (!NativeLoginBase.jsb)
                throw new Error(`${this.constructor.name}.jsb未绑定`);
            let data: any = {};
            data.callback = 'globalThis.loginCb';
            data.loginPlatform = this.getLoginPlatform();
            data = JSON.stringify(data);
            const resp = await NativeLoginBase.jsb.reflection.callStaticMethod('JSBridgeManager', "emitEventLogin:", data);
            return resp;
        } catch (error) {
            throw new Error(error);
        }
    }
}
