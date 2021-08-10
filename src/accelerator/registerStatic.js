import {isIntersect} from '../utils/common'

export function registerStaticMethod (Accelerator) {
    Accelerator.ID = 1
    Accelerator.x = 0;
    Accelerator.y = 0;
    Accelerator.width = '200px'
    Accelerator.height = '200px'
    Accelerator.minWidth = '0px'
    Accelerator.minHeight = '0px'
    Accelerator.autoCount = false
    Accelerator.dragable = true
    Accelerator.dragOutable = true
    Accelerator.resizeable = true
    Accelerator.helpAxis = true
    Accelerator.adsort = true
    Accelerator.axisColor = '#f557ff'
    Accelerator.resizeClass = ''

    Accelerator._instanceList = []

    //创建方框
    Accelerator._selectBox = document.createElement('div')
    Accelerator._selectBox.classList = 'ac_select_box'
    const style = document.createElement('style')
    style.innerHTML = `.ac_select_box {
        border:1px dashed #aaaaaa;
        position:absolute;
        pointer-events: none;
        z-index:9999;
    }`
    document.body.appendChild(style)
    Accelerator._origin = {
        x:0,
        y:0
    }
    Accelerator._hasSelectBox = false
    Accelerator._selectedNum = 0

    /**
     * 
     * @param {*} config 设置Accelerator的静态属性
     */
    Accelerator.setStaticConfig = function (config){
        Accelerator.x = config.x || Accelerator.x
        Accelerator.y = config.y || Accelerator.y
        Accelerator.width = config.width || Accelerator.width
        Accelerator.height = config.height || Accelerator.height
        Accelerator.minWidth = config.minWidth || Accelerator.minWidth
        Accelerator.minHeight = config.minHeight || Accelerator.minHeight
        if(config.maxWidth) {
            Accelerator.maxWidth = config.maxWidth
        }
        if(config.maxHeight) {
            Accelerator.maxHeight = config.maxHeight 
        }
        if(config.dragHander) {
            Accelerator.dragHander = config.dragHander
        }
        Accelerator.autoCount = config.autoCount || Accelerator.autoCount
        Accelerator.dragable = config.dragable || Accelerator.dragable
        Accelerator.dragOutable = config.dragOutable || Accelerator.dragOutable
        Accelerator.resizeable = config.resizeable || Accelerator.resizeable
        Accelerator.helpAxis = config.helpAxis || Accelerator.helpAxis
        Accelerator.adsort = config.adsort || Accelerator.adsort
        Accelerator.axisColor = config.axisColor || Accelerator.axisColor
        Accelerator.resizeClass = config.resizeClass || Accelerator.resizeClass
    }

    Accelerator.setActive = function (ac) {
        for(let i = 0;i < Accelerator._instanceList.length; i++){
            const instance = Accelerator._instanceList[i]
            if(instance.id !== ac.id) {
                if(instance.resizeable){
                    instance.hideControl()
                }
                instance.setUnActive()
                Accelerator._selectedNum = 0
            }else{
                if(instance.resizeable){
                    instance.showControl()
                }
                instance.setActive()
                Accelerator._selectedNum = 1
            }
        }
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

    Accelerator.dragActive = function(moveX,moveY,e) {
        for(let i = 0;i< Accelerator._instanceList.length; i++) {
            const instance = Accelerator._instanceList[i]
            if(instance.active) {
                let newX = instance.x + moveX
                let newY = instance.y + moveY
                instance.x = newX
                instance.y = newY
                instance.x1 = newX + instance.width
                instance.y1 = newY + instance.height
                instance.xCenter = newX + (instance.width / 2)
                instance.yCenter = newY + (instance.height / 2)

                instance._setStyle()
                instance._updatePositionConfig()
                instance.emit('dragMove',{target:instance,event:e})
            }
        }
    }

    Accelerator.addEvent = function() {
        window.addEventListener('mousedown',mousedownHandler)

        window.addEventListener('mousemove',mousemoveHandler)

        window.addEventListener('mouseup',mouseupHandler)
    }

    Accelerator.removeEvent = function() {
        window.removeEventListener('mousedown',mousedownHandler)

        window.removeEventListener('mousemove',mousemoveHandler)

        window.removeEventListener('mouseup',mouseupHandler)
    }
}

export function mousedownHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    //将选框加入body中
    document.body.appendChild(Accelerator._selectBox)
    Accelerator._origin = {
        x:e.pageX,
        y:e.pageY
    }
    Accelerator._hasSelectBox = true
    Accelerator._selectBox.style.top = e.pageY + 'px'
    Accelerator._selectBox.style.left = e.pageX + 'px'
    Accelerator._selectBox.style.width = 0
    Accelerator._selectBox.style.height = 0
}

export function mousemoveHandler(e) {
    //先设置选框的大小位置
    e.preventDefault()
    if(Accelerator._hasSelectBox) {
        let moveX = e.pageX - Accelerator._origin.x
        let moveY = e.pageY - Accelerator._origin.y
        if(moveX < 0){
            moveX = 0
        }
        if(moveY < 0){
            moveY = 0
        }
        Accelerator._selectBox.style.width = moveX + 'px'
        Accelerator._selectBox.style.height = moveY + 'px'
        //然后判断哪些被选中了
        Accelerator._selectedNum = 0
        for(let i = 0;i<Accelerator._instanceList.length;i++) {
            const instance = Accelerator._instanceList[i]
            if(isIntersect(instance.domEl, Accelerator._selectBox)) {
                if(instance.resizeable){
                    instance.showControl()
                }
                instance.setActive()
                Accelerator._selectedNum++
            }else{
                if(instance.resizeable){
                    instance.hideControl()
                }
                instance.setUnActive()
            }
        }
    }
}

export function mouseupHandler(e) {
    if(Accelerator._hasSelectBox){
        document.body.removeChild(Accelerator._selectBox)
        Accelerator._hasSelectBox = false
        Accelerator._selectBox.style.width = 0
        Accelerator._selectBox.style.height = 0
    }
}