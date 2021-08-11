import { getPoints } from '../utils/common'

export function countAdsorb(e,moveX,moveY) {
    const DISTANCE = 5
    if(this.constructor._instanceList.length < 2){
        return false
    }
    //首先找到需要对比的点和被对比的点
    const currentList = [] //当前元素的8个点
    const compareList = [] //其他元素的点
    for(let i = 0;i< this.constructor._instanceList.length; i++) {
        const instance = this.constructor._instanceList[i]
        if(instance.parentEl === this.parentEl && instance.id !== this.id) {
            compareList.push(...getPoints(instance))
        }else if(instance.parentEl === this.parentEl && instance.id == this.id){
            currentList.push(...getPoints(instance))
        }
    }
    if(compareList.length == 0) {
        return false
    }
    let flagX = false
    let flagY = false
    let res = ''
    //计算它们x和y坐标的差值，如果绝对值小于5就吸附上去，吸附了其中一个就退出循环
    for(let i = 0;i < currentList.length; i++) {
        const x = currentList[i].x
        const y = currentList[i].y
        for(let j = 0;j < compareList.length; j++) {
            const cx = compareList[j].x
            if(Math.abs(x - cx) <= DISTANCE) {
                if(!flagX){
                    const xList = this.adsortListX.map(item => item.x)
                    //避免反复横跳，把其它挨得近的点剔除
                    if(!xList.includes(cx)) {
                        const dis = x - cx
                        flagX = true
                        res += 'x'
                        this.x = this.x - dis
                        this.xCenter = this.x + (this.width / 2)
                        this.x1 = this.x + this.width
                        this.adsortPoint = compareList[j]
                        this.adsortListX = []
                    }
                }else{
                    //把除了和吸附点相同x坐标的，其他靠得近的点都记录下来
                    if(cx != this.adsortPoint.x){
                        this.adsortListX.push(compareList[j])
                    }
                }
            }
        }
        for(let j = 0;j < compareList.length; j++) {
            const cy = compareList[j].y
            if(Math.abs(y - cy) <= DISTANCE) {
                if(!flagY){
                    const yList = this.adsortListY.map(item => item.y)
                    if(!yList.includes(cy)) {
                        const dis = y - cy
                        flagY = true
                        res += 'y'
                        this.y = this.y - dis
                        this.yCenter = this.y + (this.height / 2)
                        this.y1 = this.y + this.height
                        this.adsortPoint = compareList[j]
                        this.adsortListY = []
                    }
                }else{
                    if(cy != this.adsortPoint.y){
                        this.adsortListY.push(compareList[j])
                    }
                }
            }
        }
        // if(flag){
        //     break;
        // }
    }
    //根据变动的是x还是y，修正this.dragOrigin
    if(res == 'x') { 
        if(Math.abs(moveX) > DISTANCE) {
            this.dragOrign.x = e.pageX
        }
        this.dragOrign.y = e.pageY
    }
    if(res == 'y') { 
        if(Math.abs(moveY) > DISTANCE) {
            this.dragOrign.y = e.pageY
        }
        this.dragOrign.x = e.pageX
    }
    if(res == 'xy') {
        if(Math.abs(moveX) > DISTANCE) {
            this.dragOrign.x = e.pageX
        }
        if(Math.abs(moveY) > DISTANCE) {
            this.dragOrign.y = e.pageY
        }
    }
    if(flagX || flagY) {
        return true
    }else{
        return false
    }
}

export function registerAdsort(_this) {
    _this.countAdsorb = countAdsorb
}