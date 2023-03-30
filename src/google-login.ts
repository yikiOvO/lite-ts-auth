import { JsbLoginBase, JsbLoginResponse } from './jsb-login-base';

export class GoogleLogin<T extends JsbLoginResponse> extends JsbLoginBase<T> {
    protected getLoginBody(loginData: T) {
        return {
            google: {
                idToken: loginData.idToken
            }
        };
    }

    protected getLoginFunc() {
        JsbLoginBase.jsb.reflection.callStaticMethod(
            'om/ily/core/jsb/JSBridgeManager',
            'googleLogin:',
            JSON.stringify({
                callback: 'globalThis.loginCb',
            })
        );
    }
}