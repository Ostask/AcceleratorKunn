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
        console.log(this.axisColor)
        for(let i = 0; i < 3; i++) {
            const xEl = document.createElement('div')
            xEl.classList = 'ac_line x_line x_line_' + i
            xEl.style.cssText = 'background:' + this.axisColor + ';width:1px;position:absolute;display:none;z-index:9999;'
            this.parentEl.appendChild(xEl)
            const yEl = document.createElement('div')
            yEl.classList = 'ac_line y_line y_line_' + i
            yEl.style.cssText = 'background:' + this.axisColor + ';height:1px;position:absolute;display:none;z-index:9999;'
            this.parentEl.appendChild(yEl)
        }
    }
    if(this.constructor._instanceList.length < 2) {
        return false
    }
    for(let i = 0; i < this.constructor._instanceList.length; i++) {
        const instance = this.constructor._instanceList[i]
        if(instance.parentEl === this.parentEl && instance.id !== this.id) {
            pointList.push(...getPoints(instance))
        }
    }
    if(pointList.length === 0) {
        return false
    }
    pointList.push(...getPoints(this))

    for(let i = 0; i < xLine.length; i++) {
        const value = xLine[i].value
        for(let j = 0; j < pointList.length; j++) {
            if(value === pointList[j].x) {
                xLine[i].list.push(pointList[j])
            }
        }
    }
    for(let i = 0; i < yLine.length; i++) {
        const value = yLine[i].value
        for(let j = 0; j < pointList.length; j++) {
            if(value === pointList[j].y) {
                yLine[i].list.push(pointList[j])
            }
        }
    }
    
    //list中的数据必须大于4条才算有效
    for(let i = 0; i < xLine.length; i++) {
        const line = this.parentEl.querySelector('.x_line_'+i)
        if(xLine[i].list.length < 4) {
            line.style.display = 'none'
            continue
        }
        const xPos = xLine[i].value
        const yList = xLine[i].list.map(item => item.y)
        const yPos1 = Math.min(...yList)
        const yPos2 = Math.max(...yList)
        line.style.left = xPos + 'px'
        line.style.top = yPos1 + 'px'
        line.style.height = (yPos2 - yPos1) + 'px'
        line.style.display = 'block'
    }

    for(let i = 0; i < yLine.length; i++) {
        const line = this.parentEl.querySelector('.y_line_'+i)
        if(!line){
            continue
        }
        if(yLine[i].list.length < 4) {
            line.style.display = 'none'
            continue
        }
        const yPos = yLine[i].value
        const xList = yLine[i].list.map(item => item.x)
        const xPos1 = Math.min(...xList)
        const xPos2 = Math.max(...xList)
        line.style.top = yPos + 'px'
        line.style.left = xPos1 + 'px'
        line.style.width = (xPos2 - xPos1) + 'px'
        line.style.display = 'block'
    }
}

export function hideAxisLine() {
    const lines = this.parentEl.querySelectorAll(".ac_line")
    for(let i = 0; i < lines.length; i++) {
        lines[i].style.display = 'none'
    }
}

export function removeAxisLine() {
    const lines = this.parentEl.getElementsByClassName("ac_line")
    while(lines.length > 0) {
        this.parentEl.removeChild(lines[0])
    }
}

export function registerAxis(_this) {
    _this.countAxisLine = countAxisLine
    _this.hideAxisLine = hideAxisLine
    _this.removeAxisLine = removeAxisLine
}