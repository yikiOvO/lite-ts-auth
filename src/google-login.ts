import { AjaxRpc } from 'lite-ts-ajax';

import { ILogin } from './i-login';

export class GoogleLogin implements ILogin {
    public static jsb: any;

    public async login() {
        window['loginCb'] = (e, r) => {
            if (e)
                return new Error(e);
            AjaxRpc.header['H-T'] = r.accessToken;
            return r;
        }
        const data: any = {};
        data.callback = 'window.loginCb';
        //jsb.reflection.callStaticMethod方法可能会cc层java交互方案修改而改变,后续优化需要封装
        try {
            const resp = await GoogleLogin.jsb.reflection.callStaticMethod('com/ily/core/jsb/JSBridgeManager', 'googleLogin', '(Ljava/lang/String;)V', data);
            return resp;
        } catch (error) {
            return error;
        }
    }
}