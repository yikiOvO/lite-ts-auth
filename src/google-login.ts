import { NativeLoginBase } from './jsb-login-base';
import { NativeLoginResponse } from './login-response';

export class GoogleLogin<T extends NativeLoginResponse> extends NativeLoginBase<T> {
    protected getLoginBody(loginData: T) {
        return {
            google: {
                idToken: loginData.idToken
            }
        };
    }

    protected getLoginFunc() {
        NativeLoginBase.jsb.reflection.callStaticMethod(
            'om/ily/core/jsb/JSBridgeManager',
            'googleLogin:',
            JSON.stringify({
                callback: 'globalThis.loginCb',
            })
        );
    }
}