import { RpcBase } from 'lite-ts-ajax';
import { AccountLogin } from './account-login';
import { appLogin } from './app-login';
import { BuildLoginOption, LoginFactoryBase } from './login-factory-base';
import { ILogin } from './i-login';

export class LoginFactory extends LoginFactoryBase {
    public constructor(
        private m_Rpc: RpcBase
    ) {
        super();
    }

    public build(opt: BuildLoginOption): ILogin {
        const ctor = opt.account ? AccountLogin : appLogin;
        return new ctor(opt, this.m_Rpc);
    }
}