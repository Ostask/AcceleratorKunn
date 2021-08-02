export function onMousedown(e) {
    this.dragOrign.x = e.pageX
    this.dragOrign.y = e.pageY
    this.isdragging = true
    this.domEl.style.userSelect = 'none'
}

export function onMousemove(e) {
    if(this.isdragging){
        const moveX = e.pageX - this.dragOrign.x
        const moveY = e.pageY - this.dragOrign.y
        let newX = this.x.num + moveX
        let newY = this.y.num + moveY
        if(!this.dragOutable){
            const maxX = this.parentElWidth - this.width.num
            const maxY = this.parentElHeight - this.height.num
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
        this.x.num = newX
        this.y.num = newY
        this.x1.num = newX + this.width.num
        this.y1.num = newY + this.height.num
        this.dragOrign.x = e.pageX
        this.dragOrign.y = e.pageY
        this._setStyle()
        this._updatePositionConfig()
    }
}

export function onMouseleave(e) {
    if(this.isdragging) {
        this.isdragging = false
        this.domEl.style.userSelect = 'auto'

    }
}

export function onMouseup(e) {
    this.isdragging = false
    this.domEl.style.userSelect = 'auto'
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