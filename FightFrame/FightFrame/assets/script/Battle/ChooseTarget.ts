import { eTargetType, eSortType, eComponent, eAttackType, eAttri } from "./BattleDef";
import { Actor } from "./Actor";
import { AttriComponent } from "../Components/AttriComponent";

class ChooseTarget {
    static ChooseDic = {
        [eTargetType.mAlly]: ChooseTarget.GetAlly, 

  
  

    }

    static GetAlly(actor: Actor, num: number, sort) {
        if(!num) cc.error(`num is error!`);
    

    }



    private static sertActor(list: Array<Actor>, sortType: number, actor: Actor){
        switch(sortType){
            case eSortType.mNormal:     // 默认排序
                return list;
            case eSortType.mLifeUp:     // 血量递增
                return ChooseTarget.sortByLife(list, 1);
            case eSortType.mLifeDown:
                return ChooseTarget.sortByLife(list, -1);
            case eSortType.mLifePerUp:
                return ChooseTarget.sorByLisfPer(list, 1);
            case eSortType.mLifePerDown:
                return ChooseTarget.sorByLisfPer(list, -1);
            default // 随机排序

        }
    }

    private static sortByLife(list: Array<Actor>, dire: number) { 
        function by(a: Actor, b: Actor){
            let mAttriA = a.getComponent<AttriComponent>(eComponent.AttriComponent);
            let mAttriB = b.getComponent<AttriComponent>(eComponent.AttriComponent);

            let aLife = mAttriA.get(eAttri.hp);
            let bLife = mAttriB.get(eAttri.hp);

            return aLife > bLife ? -dire : dire;
        }
        return list.sort(by)
    }

    private static sorByLisfPer(list: Array<Actor>, dire: number) {
        function by(a: Actor, b: Actor){
            let mAttriA = a.getComponent<AttriComponent>(eComponent.AttriComponent);
            let mAttriB = b.getComponent<AttriComponent>(eComponent.AttriComponent);

            let aLife = mAttriA.get(eAttri.hp)/mAttriA.get(eAttri.hpMax);
            let bLife = mAttriB.get(eAttri.hp)/mAttriB.get(eAttri.hpMax);

            return aLife > bLife ? -dire : dire;
        }
        return list.sort(by)
    }

    private static sortByRand(list: Array<Actor>) {
        function by() {
            return Math.random() * 100 < 50 ? 1 : -1;
        }
        return list.sort(by);    
    }

}