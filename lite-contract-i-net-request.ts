export interface INetRequest {
    route: string;
    header?: { [key: string]: any };
    body?: any;
}