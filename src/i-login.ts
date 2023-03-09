import { LoginResponse } from './login-response';

export interface ILogin {
    login<T extends LoginResponse>(): Promise<T>;
}