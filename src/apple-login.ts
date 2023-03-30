import { JsbLoginBase, JsbLoginResponse } from './jsb-login-base';

export class AppleLogin<T extends JsbLoginResponse> extends JsbLoginBase<T>{
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