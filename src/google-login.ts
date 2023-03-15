import { AjaxRpc, RpcBase } from 'lite-ts-ajax';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';

export type GoogleLoginResponse = {
    id: string,
    accessToken: string,
    isAuth: boolean
}

export type GoogleVerify = {
    idCard: string;
    realName: string;
    userID: string;
}


export class GoogleLogin implements ILogin {
    public constructor(
        private m_Opt: BuildLoginOption,
        private m_Rpc: RpcBase
    ) { }

    public async login() {
        const resp = await this.m_Rpc?.callWithoutThrow<GoogleLoginResponse>({
            route: '/account/login',
            body: { ...this.m_Opt }
        })
        
        if (!resp.err && resp.data)
            AjaxRpc.header['H-T'] = resp.data.accessToken;
        return resp.data;
    }

    public async register() {

    }

    public async verify(v: GoogleVerify) {
        console.log('v',v)
    }
    
}