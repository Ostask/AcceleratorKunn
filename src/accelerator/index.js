import { 
    unify,
    getSizeText,
    getElWidth,
    getElHeight,
    getElX,
    getElY
} from '../utils/common'
import { registerStaticMethod } from './registerStatic'
import {
    setDragMethods,
    removeDragMethods
} from './drag'
import {
    setResizeMethods,
    removeResizeMethods
} from './resize'

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
            throw Error('Accelerator 必须有父元素')
        }
        const domElWidth = getElWidth(domEl)
        const domElHeight = getElHeight(domEl)
        const x = getElX(domEl)
        const y = getElY(domEl)
        this.config = {...{
            id:Accelerator.ID,
            x:x || Accelerator.x,
            y:y || Accelerator.y,
            width:domElWidth || Accelerator.width,
            height:domElHeight || Accelerator.height,
            autoCount:Accelerator.autoCount,
            dragable:Accelerator.dragable,
            dragOutable:Accelerator.dragOutable,
            resizeable:Accelerator.resizeable
        },...config} //保存原始的config留个底，

        this.config.id = Accelerator.ID //这个id不允许用户来改变

        this.domEl = domEl
        this.parentEl = domEl.parentNode
        this.parentElWidth = getElWidth(this.parentEl)
        this.parentElHeight = getElHeight(this.parentEl)

        this.id = null
        //以下为用户可变动参数
        this.x = null  //x坐标
        this.y = null  //y坐标
        this.width = null //宽度
        this.height = null //高度
        this.autoCount = false //是否自动计算下一个位置的值
        this.dragable = true //是否允许拖拽
        this.dragOutable = true //是否允许拖拽超出父元素
        this.resizeable = true //是否允许改变大小
        //以上为用户可变动参数

        //以下为用户不关心的参数
        this.x1 = null // 右下角x坐标点
        this.y1 = null // 右下角y坐标点
        this.xCenter = null //x中心点
        this.yCenter = null  //y中心点
        this.xUnit = null //x的单位 
        this.yUnit = null //y的单位
        this.widthUnit = null //width的单位 
        this.heightUnit = null ///height的单位
        //以上为用户不关心的参数

        //drag的参考点
        this.dragOrign = {
            x:0,
            y:0
        }
        //resize的参考节点
        this.resizeOrign = {
            x:0,
            y:0
        }
        //当前是否在拖拽
        this.isdragging = false
        //当前往哪个方向拖拽
        this.resizeMode = null
        this.active = false
        this.resizeHandle = []

        this.watchParentInterval = null
        this._init()
    }
    /**
     * 初始化元素的大小和位置，并且刷新Accelerator上的静态参数
     */
    _init(){
        //先计算参数的值
        this._computedConfig(this.config)
        console.log(this)

        //domEl的父元素必须是relateive定位
        this.parentEl.style.position = 'relative'

        //domEl的父元素必须不能有滚动条
        this.parentEl.style.overflow = 'visible'

        //先设置元素样式
        this._setStyle()

        //更新Accelerator的静态参数
        if(this.autoCount) {
            this._updateStaticConfig()
        }

        //全局记录的id自增
        Accelerator.ID++
        //讲该实例记录
        Accelerator._instanceList.push(this)

        //监听父元素的尺寸
        this.watchParentInterval = setInterval(this.resize.bind(this),300)

        //设置拖拽
        setDragMethods(this)

        //设置改变大小
        setResizeMethods(this)
    }
    /**
     * 
     * @param {*} config 换算一下属性
     */
    _computedConfig(config) {
        this.id = config.id
        const xRes = unify(config.x, this.parentElWidth)
        this.x = xRes.num //x坐标
        this.xUnit = xRes.originUnit

        const yRes = unify(config.y, this.parentElHeight)
        this.y = yRes.num  //y坐标
        this.yUnit = yRes.originUnit

        const widthRes = unify(config.width, this.parentElWidth)
        this.width = widthRes.num //宽度
        this.widthUnit = widthRes.originUnit

        const heightRes = unify(config.height, this.parentElHeight) 
        this.height = heightRes.num//高度
        this.heightUnit = heightRes.originUnit

        this.autoCount = config.autoCount //是否自动计算下一个将要添加的元素的位置
        this.dragable = config.dragable
        this.dragOutable = config.dragOutable
        this.resizeable = config.resizeable

        this.x1 = this.x + this.width // 右下角x坐标点
        this.y1 = this.y + this.height // 右下角y坐标点
        this.xCenter = this.x + (this.width / 2) //x中心点
        this.yCenter = this.y + (this.height / 2)  //y中心点
    }
    /**
     * 设置元素样式
     */
    _setStyle() {
        this.domEl.style.position = 'absolute'
        this.domEl.style.left = this.x + 'px'
        this.domEl.style.top = this.y + 'px'
        this.domEl.style.width = this.width + 'px'
        this.domEl.style.height = this.height + 'px'
    }
    /**
     * 更新config的width和height,x,y参数
     */
    _updatePositionConfig() {
        this.config.x = getSizeText(this.x,this.xUnit,this.parentElWidth)
        this.config.y = getSizeText(this.y,this.yUnit,this.parentElHeight)
        this.config.width = getSizeText(this.width,this.widthUnit,this.parentElWidth)
        this.config.height = getSizeText(this.height,this.heightUnit,this.parentElHeight)
    }
    /**
     * 更新Accelerator的静态参数
     */
    _updateStaticConfig(){
        //这里方便定位会自动计算下一个元素的位置
        let newX = this.x + this.width
        let newY = this.y
        if((newX + this.width) > this.parentElWidth) {
            newX = 0
            newY = this.y + this.height
        }
        //这里的初始值会根据之前传入的初始值的单位来计算
        Accelerator.x = getSizeText(newX,this.xUnit,this.parentElWidth)
        Accelerator.y = getSizeText(newY,this.yUnit,this.parentElHeight)
        Accelerator.width = getSizeText(this.width,this.widthUnit,this.parentElWidth)
        Accelerator.height = getSizeText(this.height,this.heightUnit,this.parentElHeight)

        Accelerator.autoCount = this.autoCount
        Accelerator.dragable = this.dragable
        Accelerator.dragOutable = this.dragOutable
        Accelerator.resizeable = this.resizeable
    }


    /**
     * 
     * @param { string | object } } attrName 属性名 或 object类型的属性及属性值
     * @param {*} attrValue 属性值
     */
    attr(attrName, attrValue = ''){
        //先判断attrName的类型
        const type = typeof(attrName)
        const orignDragable = this.dragable
        const originResizeable = this.resizeable
        if(type === 'string'){
            //字符串的话就验证第二个attrValue的值
            if(attrValue || attrValue === false) {
                //不为空就重新设置一下这个值
                if(attrName!='id') {
                    this.config[attrName] = attrValue
                }
            } else {
                //attrValue为空就返回attrName这个参数的值
                return this.config[attrName]
            }
        }
        else if(type === 'object'){
            //attrName为Object
            //设置this.config
            //不允许改变id
            if(attrName.id) {
                delete attrName.id
            }
            this.config = {
                ...this.config,...attrName
            }
        }

        //重新计算参数值
        this._computedConfig(this.config)
        //重新设置位置
        this._setStyle()
        //其他控制方面的参数变化
        if(this.dragable != orignDragable) {
            if(this.dragable){
                setDragMethods(this)
            }else{
                removeDragMethods(this)
            }
        }
        if(this.resizeable != originResizeable) {
            if(this.resizeable){
                setResizeMethods(this)
            }else{
                removeResizeMethods(this)
            }
        }
    }
    /**
     * 刷新大小和位置
     */
     resize(){
        let width = getElWidth(this.parentEl)
        let height = getElHeight(this.parentEl)
        if(width!=this.parentElWidth || height!=this.parentElHeight) {
            console.log('父元素大小变了啊喂')
            this.parentElWidth = width
            this.parentElHeight = height
            this._computedConfig(this.config)
            //先设置元素样式
            this._setStyle()
        }
    }
    destroy() {
        clearInterval(this.watchParentInterval)
        removeDragMethods(this)
        removeResizeMethods(this)
        this.watchParentInterval = null
        const index = Accelerator._instanceList.findIndex((instance) => { return this.id === instance.id })
        Accelerator._instanceList.splice(index,1)
    }
}

registerStaticMethod(Accelerator)

window.Accelerator = Accelerator
export default Accelerator