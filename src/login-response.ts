export type LoginResponse = {
    accessToken: string;
};

export type NativeLoginResponse = {
    identityToken?: string,
    idToken?: string,
}