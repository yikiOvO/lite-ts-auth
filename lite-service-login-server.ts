import { LoginServiceBase } from '../../contract/lite-contract-login-service-base';
import { NetServiceBase } from '../../contract/lite-contract-net-service-base';
import { AccountRegister, AccountVerify, IAccountRegister, IAccountVerify } from './lite-service-net-index';

export type AccountLogin = {
    name: string;
    password: string;
    loginSucc: (data: AccountLoginResponse) => void;
    loginFail: (errCode: number) => void;
}

export type AccountLoginResponse = {
    id: string,
    accessToken: string,
    isAuth: boolean
}

export class LoginService extends LoginServiceBase implements IAccountRegister, IAccountVerify {

    public constructor(
        private m_NetService: NetServiceBase,
    ) {
        super();
    }

    public async login(v: AccountLogin) {
        const resp = await this.m_NetService.send<AccountLoginResponse>({
            route:  '/account/login',
            body: {
                account: {
                    name: v.name,
                    password: v.password,
                }
            }
        })

        if (resp?.data) {
            NetServiceBase.header['H-T'] = resp.data.accessToken;
            v.loginSucc?.(resp.data);
        } else if (resp?.err) {
            v.loginFail?.(resp.err);
        }
    }


    public async register(v: AccountRegister) {
        const resp = await this.m_NetService.send({
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
        const resp = await this.m_NetService.send({
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