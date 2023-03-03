import { contract, ioc } from '../../lite/lite-index';
import { IAccountVerify } from '../../lite/service/net/lite-service-net-index';
import { ITakeTurnsItemData } from '../ui/store/res/target-type-data/bundles-target-type-take-turns';


const { ccclass, property } = cc._decorator;

@ccclass
export class GameAuthPanel extends contract.ViewBase<ITakeTurnsItemData> {

    @property({ type: cc.EditBox, tooltip: 'name' })
    realName: cc.EditBox = null;
    @property({ type: cc.EditBox, tooltip: 'card' })
    realCard: cc.EditBox = null;
    @property({ type: cc.Node, tooltip: 'panel' })
    panel: cc.Node = null;
    @property({ type: cc.Node, tooltip: 'panel' })
    panel1: cc.Node = null;

    @ioc.Inject(contract.LoginServiceBase)
    public loginService: contract.LoginServiceBase;

    protected async onActive() {

    }

    async onSaveReal() {
        if (this.realName.string.length < 2) return console.error('名字信息有误');
        if (this.realCard.string.length < 15) return console.error('身份证信息有误');
        
        const errCode = await (this.loginService as any as IAccountVerify).verify({
            userID: String((window as any).id),
            realName: this.realName.string,
            idCard: this.realCard.string
        })
        if (errCode) {
            console.error('认证失败', errCode);
            this.realName.string = '';
            this.realCard.string = '';
        } else {
            this.panel.active = false;
            this.panel1.active = true;
        }
    }

    onGameStart() {
        (window as any).UIManager.close('hot-update:GameAuthPanel', true);

        let ver = cc.sys.localStorage.getItem('bundle_version_hot_update') || undefined;
        gg.adInit();
        cc.assetManager.loadBundle('hot-update', { version: ver }, (err, bundle) => {
            if (err) { return cc.error(err); }
            (window as any).UIManager.close('publish-login:PublishLogin');
            (window as any).UIManager.open('hot-update:HotUpdatePanel');
        });
    }

    onClose() {
        console.error('关闭游戏');
    }

}
