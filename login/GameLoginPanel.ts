import { contract, ioc } from '../../lite/lite-index';
import { IAccountRegister } from '../../lite/service/net/lite-service-net-index';
import { ITakeTurnsItemData } from '../ui/store/res/target-type-data/bundles-target-type-take-turns';

const { ccclass, property } = cc._decorator;

@ccclass
export class GameLoginPanel extends contract.ViewBase<ITakeTurnsItemData> {

    // // =======================================
    // // 编辑器属性定义(以@property修饰)
    // // =======================================

    @property({ type: cc.EditBox, tooltip: '账号' })
    editAccount: cc.EditBox = null;
    @property({ type: cc.EditBox, tooltip: '密码' })
    editPossword: cc.EditBox = null;
    @property({ type: cc.EditBox, tooltip: '确认密码' })
    editRegisterPossword: cc.EditBox = null;
    @property({ type: cc.Label, tooltip: '注册按钮label' })
    labelRegisterButton: cc.Label = null;
    @property({ type: cc.Label, tooltip: '标题' })
    title: cc.Label = null;
    @property({ type: cc.Node, tooltip: '协议勾选' })
    check: cc.Node = null;
    @property({ type: cc.Node, tooltip: '账号列表' })
    accountLayout: cc.Node = null;
    @property({ type: cc.Node, tooltip: '账号列表按钮' })
    deployment: cc.Node = null;
    @property({ type: cc.Node, tooltip: '点击层' })
    deploymentMask: cc.Node = null;
    @property({ type: cc.Label, tooltip: '按钮文本' })
    btnLable: cc.Label = null;


    @ioc.Inject(contract.LoginServiceBase)
    public loginService: contract.LoginServiceBase;


    /**是否是注册状态*/
    private isRegister = false;
    /**是否是勾选用户协议状态*/
    private isCheck = false;
    /**是否是展开状态*/
    private isDeployment = false;

    protected async onActive() {
        console.log(this.loginService);
        this.updataPanel();
        this.isCheck = !!(window as any).GGStore.get('agreeAgreement');
        this.check.active = this.isCheck;
    }

    updataPanel() {
        this.editRegisterPossword.node.parent.active = this.isRegister;
        this.deployment.active = !this.isRegister;
        this.title.string = this.isRegister ? '注册' : '登录';
        this.btnLable.string = this.isRegister ? '注册账号' : '登录';
        this.labelRegisterButton.string = this.isRegister ? '登录' : '注册';
    }

    onEnterAccountEnded(editbox, customEventData) {
        let regex = /[^A-Za-z0-9]/;
        if (this.editAccount.string.match(regex)) {
            console.log('账号仅支持英文/阿拉伯数字.不支持符号，不符合规则的字符无法输入');
            this.editAccount.string = '';
        } else if (this.editAccount.string.length < 6) {
            console.log('账号最短为6字符');
            this.editAccount.string = '';
        }
    }

    onEnterPasswordEnded(editbox, customEventData) {
        let regex = /[^A-Za-z0-9.,?!，。？！@*]/;
        if (this.editPossword.string.match(regex)) {
            console.log('密码仅支持英文/阿拉伯数字/,.?!@*');
            this.editPossword.string = '';
        }
        console.log('this.editPossword.string', this.editPossword.string)
    }

    onTouchSwitch() {
        this.isRegister = !this.isRegister;
        this.updataPanel();

        this.editAccount.string = '';
        this.editPossword.string = '';
        this.editRegisterPossword.string = '';
    }

    /**勾选协议*/
    onTouchCheck() {
        this.isCheck = !this.isCheck;
        this.check.active = this.isCheck;
        (window as any).GGStore.set('agreeAgreement', this.isCheck);
    }

    onTouchBtn() {
        if (this.isRegister) {
            this.onRegister();
        } else {
            this.onLogin();
        }
    }


    async onRegister() {
        if (this.editPossword.string != this.editRegisterPossword.string)
            return console.error('两次密码需要一致!!');
        if (!this.isCheck) return console.error('请勾选用户协议!!');
        if (this.editAccount.string.length < 6) return console.error('账号不能为空');

        const errCode = await (this.loginService as any as IAccountRegister).register({
            name: this.editAccount.string,
            password: this.editPossword.string
        });
        if (errCode) {
            console.error('注册失败', errCode)
        } else {
            this.isRegister = false;
            this.updataPanel();
        }
    }


    async onLogin() {
        if (!this.isCheck) return console.error('请勾选用户协议!!');
        if (this.editAccount.string.length < 6 || this.editPossword.string.length < 6) {
            return console.error('账号或密码错误!!');
        }

        const loginSucc = (succData) => {
            if (!succData) return;
            const oldData = (window as any).GGStore.get('userAccountData') || [];
            //有已存在的账号
            const existDatas = oldData.filter((data) => {
                if (data.account === this.editAccount.string) {
                    data.passWord = this.editPossword.string;
                }
                return data.account === this.editAccount.string;
            }).length;
            if (!existDatas) {
                if (oldData.length > 4) oldData.splice(0, 1);
                const newData = [{ account: this.editAccount.string, passWord: this.editPossword.string }];
                (window as any).GGStore.set('userAccountData', oldData.concat(newData));
            };

            (window as any).accessToken = succData.accessToken;
            (window as any).id = succData.id;

            if (!succData.isAuth) {
                (window as any).UIManager.close('hot-update:GameLoginPanel', true);
                (window as any).UIManager.open('hot-update:GameAuthPanel');
            } else {
                (window as any).UIManager.close('hot-update:GameLoginPanel', true);

                let ver = cc.sys.localStorage.getItem('bundle_version_hot_update') || undefined;
                gg.adInit();
                cc.assetManager.loadBundle('hot-update', { version: ver }, (err, bundle) => {
                    if (err) { return cc.error(err); }
                    (window as any).UIManager.close('publish-login:PublishLogin');
                    (window as any).UIManager.open('hot-update:HotUpdatePanel');
                });
            }
        }

        const loginFail = (err) => {
            if (err) {
                console.error('账号或密码错误!!');
            }
        }

        await this.loginService.login({
            name: this.editAccount.string,
            password: this.editPossword.string,
            loginSucc,
            loginFail
        });
    }

    /**展开列表*/
    onDeployment() {
        this.isDeployment = !this.isDeployment;
        this.updataDeployment();

        if (this.isDeployment) {
            const accountData = (window as any).GGStore.get('userAccountData') || [];
            for (let index = 0; index < accountData.length; index++) {
                const node = this.accountLayout.getChildByName(`account${index}`);
                node.active = true;
                node.getComponent(cc.Label).string = accountData[index].account;
            }
        }
    }

    onChooseAccount(event, custom) {
        const node = this.accountLayout.getChildByName(`account${custom}`);
        const string = node.getComponent(cc.Label).string;
        const accountData = (window as any).GGStore.get('userAccountData');
        const data = accountData.filter(data => data.account === string)[0];
        this.editAccount.string = data.account;
        this.editPossword.string = data.passWord;

        this.isDeployment = false;
        this.updataDeployment();
    }

    updataDeployment() {
        this.deploymentMask.active = this.isDeployment;
        this.accountLayout.active = this.isDeployment;
        this.deployment.rotation = this.isDeployment ? -90 : 90;
    }

    onClose() {
        (window as any).UIManager.close('hot-update:GameLoginPanel', true);
    }

    onHideDeployment() {
        if (this.accountLayout.active) {
            this.isDeployment = false;
            this.updataDeployment();
        }
    }



}
