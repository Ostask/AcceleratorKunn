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
                instance.active = false
            }else{
                if(instance.resizeable){
                    instance.showControl()
                }
                instance.active = true
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
}