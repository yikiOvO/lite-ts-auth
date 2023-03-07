
import { ILogin } from "./i-login";
import { BuildLoginOption, LoginFactoryBase } from "./login-factory-base";
import { LoginService } from "./login-service";

export class LoginFactory extends LoginFactoryBase {
    public constructor(
        private m_Url: string
    ) {
        super();
    }

    public build(opt: BuildLoginOption): ILogin {
        const ctor = opt.account && LoginService
        return new ctor(this.m_Url);
    }

}