import { NativeLoginBase } from "./native-login-base";

type AppleLoginResponse = {
    identityToken: string,
}
export class AppleLogin extends NativeLoginBase {
    protected getLoginBody(loginData: AppleLoginResponse): any {
        return { apple: { identityToken: loginData.identityToken } };
    }

    protected getLoginPlatform(): string {
        return 'Apple';
    }
}