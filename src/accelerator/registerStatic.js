export function registerStaticMethod (Accelerator) {
    Accelerator.ID = 1
    Accelerator.x = 0;
    Accelerator.y = 0;
    Accelerator.width = '100px'
    Accelerator.height = '100px'
    Accelerator.autoCount = false
    Accelerator.dragable = true
    Accelerator.dragOutable = true
    Accelerator.resizeable = true
    Accelerator.helpAxis = true
    Accelerator.adsort = true

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
        Accelerator.dragable = config.dragable || Accelerator.dragable
        Accelerator.dragOutable = config.dragOutable || Accelerator.dragOutable
        Accelerator.resizeable = config.resizeable || Accelerator.resizeable
    }

    Accelerator.setActive = function (ac) {
        for(let i = 0;i < Accelerator._instanceList.length; i++){
            const instance = Accelerator._instanceList[i]
            if(instance.id !== ac.id) {
                instance.hideControl()
            }else{
                instance.showControl()
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