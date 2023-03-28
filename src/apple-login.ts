import { NativeLoginBase } from './native-login-base';

type AppleLoginResponse = {
    identityToken: string,
}

export class AppleLogin extends NativeLoginBase {
    protected getLoginBody(loginData: AppleLoginResponse) {
        return {
            apple: {
                identityToken: loginData.identityToken
            }
        };
    }

    protected getLoginPlatform() {
        return 'Apple';
    }
}