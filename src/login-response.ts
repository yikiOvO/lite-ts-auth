export type LoginResponse = {
    accessToken: string;
};

export type NativeLoginResponse = Partial<{
    identityToken: string,
    idToken: string,
}>