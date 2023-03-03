import { INetRequest } from './lite-contract-i-net-request';
import { INetResponse } from './lite-contract-i-net-response';

const routeReg = /^\/[a-z-]+/;

export abstract class NetServiceBase {
    public static iocKey = 'NetServiceBase';
    public static body: { [key: string]: any; } = {};
    public static header: { [key: string]: string; } = {
        'Content-Type': 'application/json;charset=UTF-8',
    };
    public static timeout: number = 15000;

    public abstract send<T>(req: INetRequest): Promise<INetResponse<T>>;

    protected getRoute(route: string) {
        return route.includes('/mh/') ? route : route.replace(routeReg, m => {
            return m + '/mh';
        });
    }
}