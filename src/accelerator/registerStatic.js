import { getPoints } from '../utils/common'

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

    /**
     * 在domEl移动过程中计算对齐的点
     */
    Accelerator.countAxisLine = function(ac) {
        //首先把同父元素下，除了当前移动中的所有实例的参考点打印出来
        const pointList = []  //所有被对比的点
        const xLine = [
            {
                value:ac.x,
                list:[]
            },
            {
                value:ac.xCenter,
                list:[]
            },
            {
                value:ac.x1,
                list:[]
            }
        ]
        const yLine = [
            {
                value:ac.y,
                list:[]
            },
            {
                value:ac.yCenter,
                list:[]
            },
            {
                value:ac.y1,
                list:[]
            }
        ]
        if(!ac.parentEl.querySelector('.ac_line')){
            for(let i = 0;i < 3;i++) {
                const el = document.createElement('div')
                el.classList = 'ac_line x_line x_line_'+i
                el.style.cssText = 'background:blue;width:1px;position:absolute;display:none;z-index:9999;'
                ac.parentEl.appendChild(el)
                const el1 = document.createElement('div')
                el1.classList = 'ac_line y_line y_line_'+i
                el1.style.cssText = 'background:blue;height:1px;position:absolute;display:none;z-index:9999;'
                ac.parentEl.appendChild(el1)
            }
        }
        for(let i = 0;i< Accelerator._instanceList.length; i++) {
            const instance = Accelerator._instanceList[i]
            if(instance.parentEl === ac.parentEl && instance.id !== ac.id) {
                pointList.push(...getPoints(instance))
            }
        }
        if(pointList.length > 0) {
            pointList.push(...getPoints(ac))
        }
        for(let i = 0; i < xLine.length; i++) {
            const value = xLine[i].value
            for(let j = 0;j<pointList.length; j++) {
                if(value === pointList[j].x) {
                    xLine[i].list.push(pointList[j])
                }
            }
        }
        for(let i = 0; i < yLine.length; i++) {
            const value = yLine[i].value
            for(let j = 0;j<pointList.length; j++) {
                if(value === pointList[j].y) {
                    yLine[i].list.push(pointList[j])
                }
            }
        }
        
        //list中的数据必须大于4条才算有效
        for(let i = 0;i < xLine.length; i++) {
            if(xLine[i].list.length >= 4) {
                const xPos = xLine[i].value
                const yList = xLine[i].list.map(item => item.y)
                const yPos1 = Math.min(...yList)
                const yPos2 = Math.max(...yList)
                const line = ac.parentEl.querySelector('.x_line_'+i)
                line.style.left = xPos + 'px'
                line.style.top = yPos1 + 'px'
                line.style.height = (yPos2 - yPos1) + 'px'
                line.style.display = 'block'
            }else{
                const line = ac.parentEl.querySelector('.x_line_'+i)
                line.style.display = 'none'
            }
        }

        for(let i = 0;i < yLine.length; i++) {
            if(yLine[i].list.length >= 4) {
                const yPos = yLine[i].value
                const xList = yLine[i].list.map(item => item.x)
                const xPos1 = Math.min(...xList)
                const xPos2 = Math.max(...xList)
                const line = ac.parentEl.querySelector('.y_line_'+i)
                line.style.top = yPos + 'px'
                line.style.left = xPos1 + 'px'
                line.style.width = (xPos2 - xPos1) + 'px'
                line.style.display = 'block'
            }else{
                const line = ac.parentEl.querySelector('.y_line_'+i)
                line.style.display = 'none'
            }
        }
    }

    Accelerator.hideAxisLine = function(ac) {
        for(let i = 0;i < 3; i++) {
            const line = ac.parentEl.querySelector('.x_line_'+i)
            line.style.display = 'none'
        }

        for(let i = 0;i < 3; i++) {
            const line = ac.parentEl.querySelector('.y_line_'+i)
            line.style.display = 'none'
        }
    }
}