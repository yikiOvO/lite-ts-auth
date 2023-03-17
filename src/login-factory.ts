import { RpcBase } from 'lite-ts-rpc';

import { AccountLogin } from './account-login';
import { AppLogin } from './app-login';
import { GoogleLogin } from './google-login';
import { ILogin } from './i-login';
import { BuildLoginOption, LoginFactoryBase } from './login-factory-base';

export class LoginFactory extends LoginFactoryBase {
    public constructor(
        private m_Rpc?: RpcBase
    ) {
        super();
    }

    public build(opt: BuildLoginOption): ILogin {
        if (opt.googlePlay)
            return new GoogleLogin();
        const ctor = opt.account ? AccountLogin : AppLogin;
        return new ctor(opt, this.m_Rpc);
    }
}