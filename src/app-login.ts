import { AccountLoginResponse, ILogin } from "./i-login";
import { AjaxRpc, RpcBase } from "lite-ts-ajax";
import { BuildLoginOption } from "./login-factory-base";

export class appLogin implements ILogin {
    public constructor(
        private m_opt: BuildLoginOption,
        private m_Rpc: RpcBase
    ) { }

    public async login(): Promise<any> {
        const resp = await this.m_Rpc.callWithoutThrow<AccountLoginResponse>({
            route: '/account/login',
            body: { ...this.m_opt }
        })
        AjaxRpc.header['H-T'] = resp.data.accessToken;
        return resp.data;
    }
}