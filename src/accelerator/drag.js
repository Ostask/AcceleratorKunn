import {
    isDom
} from '../utils/common'

export function countMove(newX,newY,_this) {
    if(!_this.dragOutable){
        const maxX = _this.parentElWidth - _this.width
        const maxY = _this.parentElHeight - _this.height
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
    _this.x = newX
    _this.y = newY
    _this.x1 = newX + _this.width
    _this.y1 = newY + _this.height
    _this.xCenter = newX + (_this.width / 2)
    _this.yCenter = newY + (_this.height / 2)
}

export function onMousedown(e) {
    e.stopPropagation();
    this.dragOrign.x = e.pageX
    this.dragOrign.y = e.pageY
    this.isdragging = true
    this.domEl.style.userSelect = 'none'
    this.emit('dragStart',{target:this,event:e})
}

export function onKeydown(e) {
    let newX = this.x
    let newY = this.y
    if(this.active){
        switch(e.keyCode) {
            case 38: //上
                newY -= 1
                break;
            case 40: //下
                newY += 1
                break;
            case 37: //左
                newX -= 1
                break;
            case 39: //右
                newX += 1
                break;        
        }
        if(this.constructor._selectedNum <= 1){
            countMove(newX,newY,this)
            this._setStyle()
            this._updatePositionConfig()
            if(this.helpAxis) {
                this.countAxisLine()
            }
            this.emit('dragMove',{target:this,event:e})
        }else{
            this.x = newX
            this.y = newY
            this.x1 = newX + this.width
            this.y1 = newY + this.height
            this.xCenter = newX + (this.width / 2)
            this.yCenter = newY + (this.height / 2)

            this._setStyle()
            this._updatePositionConfig()
            this.emit('dragMove',{target:this,event:e})
        }
    }
}

export function onMousemove(e) {
    if(this.isdragging){
        this.domEl.classList.add("ac_dragging")
        const moveX = (e.pageX - this.dragOrign.x) / this.ratio
        const moveY = (e.pageY - this.dragOrign.y) / this.ratio
        if(this.constructor._selectedNum <= 1){
            let newX = this.x + moveX
            let newY = this.y + moveY
            countMove(newX,newY,this)
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
        }else{
            this.constructor.dragActive(moveX,moveY,e)
            this.dragOrign.x = e.pageX
            this.dragOrign.y = e.pageY
        }
    }
}

export function onMouseleave(e) {
    if(this.isdragging) {
        this.domEl.classList.remove("ac_dragging")
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
        this.domEl.classList.remove("ac_dragging")
        this.isdragging = false
        this.domEl.style.userSelect = 'auto'
        if(this.helpAxis) {
            this.hideAxisLine()
        }
        this.emit('dragEnd',{target:this,event:e})
    }
}


export function onKeyup(e) {
    if(this.active) {
        this.domEl.classList.remove("ac_dragging")
        if(this.helpAxis) {
            this.hideAxisLine()
        }
        this.emit('dragEnd',{target:this,event:e})
    }
}

export function setDragMethods(_this) {
    if(_this.dragable){
        if(_this.dragHandler) {
            if(typeof _this.dragHandler == 'string') {
                _this.dragButton = _this.domEl.querySelector(_this.dragHandler)
            }
            if(isDom(_this.dragHandler)){
                _this.dragButton = _this.dragDom
            }
        }else{
            _this.dragButton = _this.domEl
        }
        _this.bindMousedown = onMousedown.bind(_this)
        _this.dragButton.addEventListener("mousedown",_this.bindMousedown)
        _this.bindMouseMove = onMousemove.bind(_this)
        window.addEventListener("mousemove",_this.bindMouseMove)
        _this.bindMouseLeave = onMouseleave.bind(_this)
        window.addEventListener("mouseleave",_this.bindMouseLeave)
        _this.bindMouseUp = onMouseup.bind(_this)
        window.addEventListener("mouseup",_this.bindMouseUp)
        _this.bindKeydown = onKeydown.bind(_this)
        window.addEventListener("keydown",_this.bindKeydown)
        _this.bindKeyup = onKeyup.bind(_this)
        window.addEventListener("keyup",_this.bindKeyup)
    }
}

export function removeDragMethods(_this) {
    _this.dragButton.removeEventListener("mousedown",_this.bindMousedown)
    window.removeEventListener("mousemove",_this.bindMouseMove)
    window.removeEventListener("mouseleave",_this.bindMouseLeave)
    window.removeEventListener("mouseup",_this.bindMouseUp)
    window.removeEventListener("keydown",_this.bindKeydown)
    window.removeEventListener("keyup",_this.bindKeyup)
}