export abstract class LoginServiceBase {
    public static iocKey = 'LoginServiceBase';

    public abstract login(v:any): Promise<any>;
}