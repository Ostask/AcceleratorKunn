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
        if(!domEl.parentNode){
            throw Error('Accelerator 必须绑定一个有父元素')
        }
        this.config = {...{
            id:Accelerator.ID,
            x:Accelerator.x,
            y:Accelerator.y,
            width:Accelerator.width,
            height:Accelerator.height,
            autoCount:Accelerator.autoCount
        },...config} //保存原始的config留个底，

        this.config.id = Accelerator.ID //这个id不允许用户来改变

        this.domEl = domEl
        this.parentEl = domEl.parentNode
        this.parentElWidth = this.parentEl.clientWidth
        this.parentElHeight = this.parentEl.clientHeight

        this.id = null
        this.x = null  //x坐标
        this.y = null  //y坐标
        this.width = null //宽度
        this.height = null //高度
        this.autoCount = false //是否自动计算下一个位置的值

        this.watchParentInterval = null
        this._init()
    }
    /**
     * 初始化元素的大小和位置，并且刷新Accelerator上的静态参数
     */
    _init(){
        //先计算参数的值
        this._computedConfig(this.config)
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

        Accelerator.ID++
        Accelerator._instanceList.push(this)

        //监听父元素的尺寸
        this.watchParentInterval = setInterval(this.resize.bind(this),300)
    }
    /**
     * 刷新大小和位置
     */
    resize(){
        let width = this.parentEl.clientWidth
        let height = this.parentEl.clientHeight
        if(width!=this.parentElWidth || height!=this.parentElHeight) {
            console.log('父元素大小变了啊喂')
            this.parentElWidth = this.parentEl.clientWidth
            this.parentElHeight = this.parentEl.clientHeight
            this._computedConfig(this.config)
            //先设置元素样式
            this._setStyle()
        }
    }
    /**
     * 
     * @param {*} config 换算一下属性
     */
    _computedConfig(config) {
        this.id = config.id
        this.x = unify(config.x, this.parentElWidth)  //x坐标
        this.y = unify(config.y, this.parentElHeight)  //y坐标
        this.width = unify(config.width, this.parentElWidth) //宽度
        this.height = unify(config.height, this.parentElHeight) //高度

        this.autoCount = config.autoCount //是否自动计算下一个将要添加的元素的位置
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
    destroy() {
        clearInterval(this.watchParentInterval)
        this.watchParentInterval = null
        const index = Accelerator._instanceList.findIndex((instance) => { return this.id === instance.id })
        Accelerator._instanceList.splice(index,1)
    }
}

Accelerator.ID = 1
Accelerator.x = 0;
Accelerator.y = 0;
Accelerator.width = '100px'
Accelerator.height = '100px'
Accelerator.autoCount = false
Accelerator._instanceList = []

/**
 * 
 * @param {*} config 设置Accelerator的静态属性
 */
Accelerator.setStaticConfig = function (config){
    Accelerator.x = config.x || Accelerator.x
    Accelerator.y = config.y || Accelerator.y
    Accelerator.width = config.width || Accelerator.width
    Accelerator.height = config.height || Accelerator.height
    Accelerator.autoCount = config.autoCount || Accelerator.autoCount
}

/**
 * 销毁所有Accelerator实例
 */
Accelerator.destroyAll = function() {
    for(let i = 0;i < Accelerator._instanceList.length; i++){
        const instance = Accelerator._instanceList[i]
        instance.destroy()
        i--
    }
}

window.Accelerator = Accelerator
export default Accelerator