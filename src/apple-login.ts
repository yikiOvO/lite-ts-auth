import { NativeLoginBase } from './native-login-base';
import { NativeLoginResponse } from './login-response';

export class AppleLogin<T extends NativeLoginResponse> extends NativeLoginBase<T>{
    protected getLoginBody(loginData: T) {
        return {
            apple: {
                identityToken: loginData.identityToken
            }
        };
    }

    protected getLoginFunc() {
        NativeLoginBase.jsb.reflection.callStaticMethod(
            'JSBridgeManager',
            'emitEventLogin:',
            JSON.stringify({
                callback: 'globalThis.loginCb',
                loginPlatform: 'Apple'
            })
        );
    }
}