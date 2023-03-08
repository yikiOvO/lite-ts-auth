import { AjaxRpc } from 'lite-ts-ajax';

import { AccountLogin } from './account-login';
import { LoginFactory as Self } from './login-factory';

describe('src/rpc.ts', () => {
    describe('.callWithoutThrow<T>(req: AjaxRpcCallOption)', () => {
        it('get', async () => {
            const rpc = new AjaxRpc('http://10.8.8.234:30007');
            const newRpc = new Self(rpc)
            const buildRpc = newRpc.build({
                account: {
                    name: '1111',
                    password: '12222'
                }
            });
            const res = await buildRpc.login();
            (buildRpc as AccountLogin).register
            console.log(res);
        });
    });
});