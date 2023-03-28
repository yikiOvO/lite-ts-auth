import { NativeLoginBase } from './native-login-base';

type GoogleLoginResponse = {
    idToken: string,
}

export class GoogleLogin extends NativeLoginBase {
    protected getLoginBody(loginData: GoogleLoginResponse) {
        return {
            google: {
                idToken: loginData.idToken
            }
        };
    }

    protected getLoginPlatform() {
        return 'Google';
    }
}