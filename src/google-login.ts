import { NativeLoginBase } from "./native-login-base";

type GoogleLoginResponse = {
    idToken: string,
}

export class GoogleLogin extends NativeLoginBase {
    protected getLoginBody(loginData: GoogleLoginResponse): any {
        return { google: { idToken: loginData.idToken } };
    }

    protected getLoginPlatform(): string {
        return 'Google';
    }
}