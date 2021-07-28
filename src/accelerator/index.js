import { 
    unify,
    getSizeText
} from '../utils/common'

class Accelerator {
    /**
     * 
     * @param {*} domEl dom元素，必传
     * @param {*} config  配置项
     */
    constructor(domEl,config = {}){
        if(!domEl){
            throw Error('Accelerator 必须绑定一个dom元素')
        }
        this.domEl = domEl
        this.parentEl = domEl.parentNode
        this.parentElWidth = this.parentEl.clientWidth
        this.parentElHeight = this.parentEl.clientHeight
        this.x = unify(config.x || Accelerator.x, this.parentElWidth)  //x坐标
        this.y = unify(config.y || Accelerator.y, this.parentElHeight)  //y坐标
        this.width = unify(config.width || Accelerator.width, this.parentElWidth) //宽度
        this.height = unify(config.height || Accelerator.height, this.parentElHeight) //高度

        this.autoCount = config.autoCount || false //是否自动计算下一个将要添加的元素的位置
        this.init()
    }
    /**
     * 初始化元素的大小和位置，并且刷新Accelerator上的静态参数
     */
    init(){
        console.log("初始化咯")
        console.log(this.x,this.y,this.width,this.height)
        //domEl的父元素必须是relateive定位
        this.parentEl.style.position = 'relative'
        //domEl的父元素必须不能有滚动条
        this.parentEl.style.overflow = 'hidden'
        //先设置元素样式
        this._setStyle()
        //更新Accelerator的静态参数
        if(this.autoCount) {
            this._updateStaticConfig()
        }
    }
    /**
     * 设置元素样式
     */
    _setStyle() {
        this.domEl.style.position = 'absolute'
        this.domEl.style.left = this.x.num + 'px'
        this.domEl.style.top = this.y.num + 'px'
        this.domEl.style.width = this.width.num + 'px'
        this.domEl.style.height = this.height.num + 'px'
    }
    /**
     * 更新Accelerator的静态参数
     */
    _updateStaticConfig(){
        //这里方便定位会自动计算下一个元素的位置
        let newX = this.x.num + this.width.num
        let newY = this.y.num
        if((newX + this.width.num) > this.parentElWidth) {
            newX = 0
            newY = this.y.num + this.height.num
        }
        //这里的初始值会根据之前传入的初始值的单位来计算
        Accelerator.x = getSizeText({num:newX,originUnit:this.x.originUnit},this.parentElWidth)
        Accelerator.y = getSizeText({num:newY,originUnit:this.y.originUnit},this.parentElHeight)
        Accelerator.width = getSizeText(this.width,this.parentElWidth)
        Accelerator.height = getSizeText(this.height,this.parentElHeight)
    }
}

Accelerator.x = 0;
Accelerator.y = 0;
Accelerator.width = '100px'
Accelerator.height = '100px'

Accelerator.setStaticConfig = function (config){
    Accelerator.x = config.x || Accelerator.x
    Accelerator.y = config.y || Accelerator.y
    Accelerator.width = config.width || Accelerator.width
    Accelerator.height = config.height || Accelerator.height
}

window.Accelerator = Accelerator
export default Accelerator