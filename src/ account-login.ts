import { AccountLoginResponse, AccountVerify, ILogin } from "./i-login";
import { AjaxRpc, RpcBase, RpcCallOption } from "lite-ts-ajax";
import { BuildLoginOption } from "./login-factory-base";

export class AccountLogin implements ILogin {
    public constructor(
        private m_opt: BuildLoginOption,
        private m_Rpc: RpcBase
    ) { }

    public async login(): Promise<any> {
        const resp = await this.m_Rpc.callWithoutThrow<AccountLoginResponse>({
            method:"POST",
            route: '/account/login',
            body: { ...this.m_opt }
        } as RpcCallOption)
        AjaxRpc.header['H-T'] = resp.data.accessToken;
        return resp.data;
    }

    public async register(): Promise<number> {
        const resp = await this.m_Rpc.callWithoutThrow<number>({
            route: '/account/register',
            body: { ...this.m_opt }
        })
        return resp.err;
    }

    public async verify(v: AccountVerify): Promise<number> {
        const resp = await this.m_Rpc.callWithoutThrow<number>({
            route: '/account/verify',
            body: {
                userID: v.userID,
                realName: v.realName,
                idCard: v.idCard
            }
        })
        return resp.err;
    }
}