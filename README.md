# ![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 安装
```
npm install lite-ts-ajax
```

## 使用
```typescript
    import { AjaxRpc } from 'lite-ts-ajax';
    import { AccountLogin } from './ account-login';
    import { LoginFactory as Self } from './login-factory';
    /**初始化*/
    const rpc = new AjaxRpc('域名');
    const loginFactory = new Self(rpc);
    const buildLogin = loginFactory.build({
        account: {
            name: '玩家账号',
            password: '玩家密码'
        }
    });
    /**登录*/
    const login = await buildLogin.login();
    /**注册*/
    const register = await (buildRpc as AccountLogin).register();
    /**实名*/
    const verify = await (buildRpc as AccountLogin).verify({
            userID: '玩家id',
            realName: '真实姓名',
            idCard: '身份证号'
    });
```
