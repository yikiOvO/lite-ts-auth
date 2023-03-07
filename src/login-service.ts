import { AccountLogin, AccountLoginResponse, AccountRegister, AccountVerify, ILogin } from "./i-login";
import { AjaxRpc, RpcBase } from "lite-ts-ajax";

export class LoginService implements ILogin {
    public constructor(private m_BaseUrl: string) {
        
    }

    private m_Rpc: RpcBase = new AjaxRpc(this.m_BaseUrl);

    public async login(v: AccountLogin): Promise<any> {
        const resp = await this.m_Rpc.callWithoutThrow<AccountLoginResponse>({
            route: '/account/login',
            body: {
                account: {
                    name: v.name,
                    password: v.password,
                }
            }
        })
        AjaxRpc.header['H-T'] = resp.data.accessToken;
        return resp.data;
    }

    public async register(v: AccountRegister) {
        const resp = await this.m_Rpc.callWithoutThrow<number>({
            route: '/account/register',
            body: {
                account: {
                    name: v.name,
                    password: v.password,
                }
            }
        })
        return resp.err;
    }

    public async verify(v: AccountVerify) {
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