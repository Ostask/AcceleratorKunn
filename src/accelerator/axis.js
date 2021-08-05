import { getPoints } from '../utils/common'

/**
     * 在domEl移动过程中计算对齐的点
     */
 export function countAxisLine() {
    //首先把同父元素下，除了当前移动中的所有实例的参考点打印出来
    const pointList = []  //所有被对比的点
    const xLine = [
        {
            value:this.x,
            list:[]
        },
        {
            value:this.xCenter,
            list:[]
        },
        {
            value:this.x1,
            list:[]
        }
    ]
    const yLine = [
        {
            value:this.y,
            list:[]
        },
        {
            value:this.yCenter,
            list:[]
        },
        {
            value:this.y1,
            list:[]
        }
    ]
    if(!this.parentEl.querySelector('.ac_line')){
        for(let i = 0;i < 3;i++) {
            const el = document.createElement('div')
            el.classList = 'ac_line x_line x_line_'+i
            el.style.cssText = 'background:blue;width:1px;position:absolute;display:none;z-index:9999;'
            this.parentEl.appendChild(el)
            const el1 = document.createElement('div')
            el1.classList = 'ac_line y_line y_line_'+i
            el1.style.cssText = 'background:blue;height:1px;position:absolute;display:none;z-index:9999;'
            this.parentEl.appendChild(el1)
        }
    }
    if(this.constructor._instanceList.length < 2) {
        return false
    }
    for(let i = 0;i< this.constructor._instanceList.length; i++) {
        const instance = this.constructor._instanceList[i]
        if(instance.parentEl === this.parentEl && instance.id !== this.id) {
            pointList.push(...getPoints(instance))
        }
    }
    if(pointList.length > 0) {
        pointList.push(...getPoints(this))
    }else{
        return false
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
            const line = this.parentEl.querySelector('.x_line_'+i)
            line.style.left = xPos + 'px'
            line.style.top = yPos1 + 'px'
            line.style.height = (yPos2 - yPos1) + 'px'
            line.style.display = 'block'
        }else{
            const line = this.parentEl.querySelector('.x_line_'+i)
            line.style.display = 'none'
        }
    }

    for(let i = 0;i < yLine.length; i++) {
        if(yLine[i].list.length >= 4) {
            const yPos = yLine[i].value
            const xList = yLine[i].list.map(item => item.x)
            const xPos1 = Math.min(...xList)
            const xPos2 = Math.max(...xList)
            const line = this.parentEl.querySelector('.y_line_'+i)
            if(line) {
                line.style.top = yPos + 'px'
                line.style.left = xPos1 + 'px'
                line.style.width = (xPos2 - xPos1) + 'px'
                line.style.display = 'block'
            }
        }else{
            const line = this.parentEl.querySelector('.y_line_'+i)
            if(line)line.style.display = 'none'
        }
    }
}

export function hideAxisLine() {
    for(let i = 0;i < 3; i++) {
        const line = this.parentEl.querySelector('.x_line_'+i)
        if(line)line.style.display = 'none'
    }

    for(let i = 0;i < 3; i++) {
        const line = this.parentEl.querySelector('.y_line_'+i)
        if(line)line.style.display = 'none'
    }
}

export function registerAxis(_this) {
    _this.countAxisLine = countAxisLine
    _this.hideAxisLine = hideAxisLine
}