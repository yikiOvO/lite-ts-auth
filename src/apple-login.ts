import { JsbLoginBase } from './jsb-login-base';
import { NativeLoginResponse } from './login-response';

export class AppleLogin<T extends NativeLoginResponse> extends JsbLoginBase<T>{
    protected getLoginBody(loginData: T) {
        return {
            apple: {
                identityToken: loginData.identityToken
            }
        };
    }

    protected getLoginFunc() {
        JsbLoginBase.jsb.reflection.callStaticMethod(
            'JSBridgeManager',
            'emitEventLogin:',
            JSON.stringify({
                callback: 'globalThis.loginCb',
                loginPlatform: 'Apple'
            })
        );
    }
}