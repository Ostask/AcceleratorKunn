import {
    prevent
} from '../utils/common'

export function onMousedown(e) {
    prevent(e)
    this.dragOrign.x = e.pageX
    this.dragOrign.y = e.pageY
    this.isdragging = true
    this.domEl.style.userSelect = 'none'
    this.emit('dragStart',{target:this,event:e})
}

export function onMousemove(e) {
    if(this.isdragging){
        const moveX = e.pageX - this.dragOrign.x
        const moveY = e.pageY - this.dragOrign.y
        let newX = this.x + moveX
        let newY = this.y + moveY
        if(!this.dragOutable){
            const maxX = this.parentElWidth - this.width
            const maxY = this.parentElHeight - this.height
            const minX = 0
            const minY = 0
            if(newX < minX) {
                newX = minX
            }
            if(newX > maxX) {
                newX = maxX
            }
            if(newY < minY) {
                newY = minY
            }
            if(newY > maxY) {
                newY = maxY
            }
        }
        this.x = newX
        this.y = newY
        this.x1 = newX + this.width
        this.y1 = newY + this.height
        this.xCenter = newX + (this.width / 2)
        this.yCenter = newY + (this.height / 2)
        let flag =false
        if(this.adsort) {
            flag = this.countAdsorb(e,moveX,moveY)
        }
        if(!flag) {
            this.dragOrign.x = e.pageX
            this.dragOrign.y = e.pageY
        }
        this._setStyle()
        this._updatePositionConfig()
        if(this.helpAxis) {
            this.countAxisLine()
        }
        this.emit('dragMove',{target:this,event:e})
    }
}

export function onMouseleave(e) {
    if(this.isdragging) {
        this.isdragging = false
        this.domEl.style.userSelect = 'auto'
        if(this.helpAxis) {
            this.hideAxisLine()
        }
        this.emit('dragEnd',{target:this,event:e})
    }
}

export function onMouseup(e) {
    if(this.isdragging) {
        this.isdragging = false
        this.domEl.style.userSelect = 'auto'
        if(this.helpAxis) {
            this.hideAxisLine()
        }
        this.emit('dragEnd',{target:this,event:e})
    }
}

export function setDragMethods(_this) {
    if(_this.dragable){
        _this.bindMousedown = onMousedown.bind(_this)
        _this.domEl.addEventListener("mousedown",_this.bindMousedown)
        _this.bindMouseMove = onMousemove.bind(_this)
        window.addEventListener("mousemove",_this.bindMouseMove)
        _this.bindMouseLeave = onMouseleave.bind(_this)
        window.addEventListener("mouseleave",_this.bindMouseLeave)
        _this.bindMouseUp = onMouseup.bind(_this)
        window.addEventListener("mouseup",_this.bindMouseUp)
    }
}

export function removeDragMethods(_this) {
    _this.domEl.removeEventListener("mousedown",_this.bindMousedown)
    window.removeEventListener("mousemove",_this.bindMouseMove)
    window.removeEventListener("onMouseleave",_this.bindMouseLeave)
    window.removeEventListener("mouseup",_this.bindMouseUp)
}