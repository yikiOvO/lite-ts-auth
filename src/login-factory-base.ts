import { ILogin } from './i-login';

export type BuildLoginOption = Partial<{
    account: {
        name: string;
        password: string;
    },
    app: {
        id: string;
        secret: string;
    }
    googlePlay?
}>;

export abstract class LoginFactoryBase {
    public static ctor = 'LoginFactoryBase';

    public abstract build(opt: BuildLoginOption): ILogin;
}