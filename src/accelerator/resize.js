import {
    addPrefix,
    prevent,
    unify
} from '../utils/common'

export function addControl(domEl,_this) {
    let style = 'border:1px solid #8c8c8c;border-radius:50%;width:10px;height:10px;background-color:#fff;position:absolute;display:none;'
    if(_this.resizeClass) {
        style = 'position:absolute;display:none;'
    }

    const control_tl = document.createElement('div')
    const control_tm = document.createElement('div')
    const control_tr = document.createElement('div')
    const control_mr = document.createElement('div')
    const control_br = document.createElement('div')
    const control_bm = document.createElement('div')
    const control_bl = document.createElement('div')
    const control_ml = document.createElement('div')

    if(_this.resizeClass) {
        control_tl.classList = _this.resizeClass
        control_tm.classList = _this.resizeClass
        control_tr.classList = _this.resizeClass
        control_mr.classList = _this.resizeClass
        control_br.classList = _this.resizeClass
        control_bm.classList = _this.resizeClass
        control_bl.classList = _this.resizeClass
        control_ml.classList = _this.resizeClass
    }

    control_tl.style.cssText = style + 'top:0;left:0;cursor:nw-resize;'+addPrefix('transform:translate(-50%,-50%)')
    control_tm.style.cssText = style + 'top:0;left:50%;cursor:n-resize;'+addPrefix('transform:translate(-50%,-50%)')
    control_tr.style.cssText = style + 'top:0;right:0;cursor:ne-resize;'+addPrefix('transform:translate(50%,-50%)')
    control_mr.style.cssText = style + 'top:50%;right:0;cursor:e-resize;'+addPrefix('transform:translate(50%,-50%)')
    control_br.style.cssText = style + 'bottom:0;right:0;cursor:se-resize;'+addPrefix('transform:translate(50%,50%)')
    control_bm.style.cssText = style + 'bottom:0;left:50%;cursor:s-resize;'+addPrefix('transform:translate(-50%,50%)')
    control_bl.style.cssText = style + 'bottom:0;left:0;cursor:sw-resize;'+addPrefix('transform:translate(-50%,50%)')
    control_ml.style.cssText = style + 'top:50%;left:0;cursor:w-resize;'+addPrefix('transform:translate(-50%,-50%)')

    return {
        control_tl,
        control_tm,
        control_tr,
        control_mr,
        control_br,
        control_bm,
        control_bl,
        control_ml
    }
}

export function showControl() {
    for(let i = 0;i<this.resizeHandle.length; i++) {
        this.resizeHandle[i].style.display = 'block'
    }
}

export function hideControl() {
    for(let i = 0;i<this.resizeHandle.length; i++) {
        this.resizeHandle[i].style.display = 'none'
    }
}

export function resizedown(e, mode, _this) {
    prevent(e)
    _this.resizeOrign.x = e.pageX
    _this.resizeOrign.y = e.pageY
    _this.isdragging = false
    _this.resizeMode = mode
    _this.domEl.style.userSelect = 'none'
    _this.emit('zoomStart',{target:_this,type:_this.resizeMode,event:e})
}

export function onUnActive(e) {
    e.stopPropagation();
    this.hideControl()
    this.setUnActive()
    this.constructor._selectedNum = 0
}

export function countMaxMin(now,min,max,refer) {
    let res
    if(min) {
        res = Math.max(unify(min, refer).num,now)
    }else{
        res = Math.max(0,now)
    }
    if(max) {
        res = Math.min(unify(max, refer).num,now)
    }
    return res
}

export function moveUp(moveY,_this) {
    //??????y???height
    let newY = _this.y + moveY
    let newHeight = _this.height - moveY
    let newY1 = newY + newHeight
    if(!_this.dragOutable){
        const minY = 0
        const maxY = newY1
        const minHeight = 0
        const maxHeight = newY1
        newY = Math.min(maxY,Math.max(minY,newY))
        newHeight = Math.min(maxHeight,Math.max(minHeight,newHeight))
    }
    newHeight = countMaxMin(newHeight,_this.minHeight,_this.maxHeight,_this.parentElHeight)
    _this.y = newY
    _this.height = newHeight
    _this.y1 = newY + newHeight
    _this.yCenter = newY + (newHeight / 2)
}

export function moveDown(moveY, _this) {
    //??????height
    let newHeight = _this.height + moveY
    if(!_this.dragOutable){
        const minHeight = 0
        const maxHeight = _this.parentElHeight - _this.y
        newHeight = Math.min(maxHeight,Math.max(minHeight,newHeight))
    }
    newHeight = countMaxMin(newHeight,_this.minHeight,_this.maxHeight,_this.parentElHeight)
    _this.height = newHeight
    _this.y1 = _this.y + newHeight
    _this.yCenter = _this.y + (newHeight / 2)
}

export function moveLeft(moveX, _this){
    //??????x???width
    let newX = _this.x + moveX
    let newWidth = _this.width - moveX
    let newX1 = newX + newWidth
    if(!_this.dragOutable){
        const minX = 0
        const maxX = newX1
        const minWidth = 0
        const maxWidth = newX1
        newX = Math.min(maxX,Math.max(minX,newX))
        newWidth = Math.min(maxWidth,Math.max(minWidth,newWidth))
    }
    newWidth = countMaxMin(newWidth,_this.minWidth,_this.maxWidth,_this.parentElWidth)
    _this.x = newX
    _this.width = newWidth
    _this.x1 = newX + newWidth
    _this.xCenter = newX + (newWidth / 2)
}

export function moveRight(moveX, _this){
    //??????width
    let newWidth = _this.width + moveX
    if(!_this.dragOutable){
        const minWidth = 0
        const maxWidth = _this.parentElWidth - _this.x
        newWidth = Math.min(maxWidth,Math.max(minWidth,newWidth))
    }
    newWidth = countMaxMin(newWidth,_this.minWidth,_this.maxWidth,_this.parentElWidth)
    _this.width = newWidth
    _this.x1 = _this.x + newWidth
    _this.xCenter = _this.x + (newWidth / 2)
}

export function resizeMove(e) {
    if(this.resizeMode){
        this.domEl.classList.add("ac_resizing")
        const moveX = (e.pageX - this.resizeOrign.x) / this.ratio
        const moveY = (e.pageY - this.resizeOrign.y) / this.ratio
        //??????resizeMode?????????x,y,width,height?????????
        //??????resizeMode?????????x,y,width,height??????????????????
        switch(this.resizeMode) {
            case 'tl':
                moveUp(moveY,this)
                moveLeft(moveX,this)
                break;
            case 'tm':
                moveUp(moveY,this)
                break;
            case 'tr':
                moveUp(moveY,this)
                moveRight(moveX,this)
                break;
            case 'mr':
                moveRight(moveX,this)
                break;
            case 'br':
                moveDown(moveY,this)
                moveRight(moveX,this)
                break;
            case 'bm':
                moveDown(moveY,this)
                break;
            case 'bl':
                moveDown(moveY,this)
                moveLeft(moveX,this)
                break;
            case 'ml':
                moveLeft(moveX,this)
                break;                            
        }
        this.resizeOrign.x = e.pageX
        this.resizeOrign.y = e.pageY

        this._setStyle()
        this._updatePositionConfig()
        if(this.helpAxis) {
            this.countAxisLine()
        }
        this.emit('zoomMove',{target:this,type:this.resizeMode,event:e})
    }
}

export function resizeUp(e) {
    if(this.resizeMode) {
        this.domEl.classList.remove("ac_resizing")
        this.resizeMode = null
        this.domEl.style.userSelect = 'auto'
        if(this.helpAxis) {
            this.hideAxisLine()
        }
        this.emit('zoomEnd',{target:this,type:this.resizeMode,event:e})
    }
}

export function setResizeMethods(_this) {
    if(!_this.resizeable){
        return false
    }
    //????????????8????????????
    const {control_tl, control_tm, control_tr, control_mr, control_br, control_bm, control_bl,control_ml } = addControl(_this.domEl,_this)
    const domEl = _this.domEl
    _this.resizeHandle = [control_tl, control_tm, control_tr, control_mr, control_br, control_bm, control_bl,control_ml]

    _this.showControl = showControl
    _this.hideControl = hideControl

    //????????????????????????
    //??????????????????????????????????????????????????????
    control_tl.addEventListener('mousedown',(e) => {
        resizedown(e,'tl',_this)
    })
    control_tm.addEventListener('mousedown',(e) => {
        resizedown(e,'tm',_this)
    })
    control_tr.addEventListener('mousedown',(e) => {
        resizedown(e,'tr',_this)
    })
    control_mr.addEventListener('mousedown',(e) => {
        resizedown(e,'mr',_this)
    })
    control_br.addEventListener('mousedown',(e) => {
        resizedown(e,'br',_this)
    })
    control_bm.addEventListener('mousedown',(e) => {
        resizedown(e,'bm',_this)
    })
    control_bl.addEventListener('mousedown',(e) => {
        resizedown(e,'bl',_this)
    })
    control_ml.addEventListener('mousedown',(e) => {
        resizedown(e,'ml',_this)
    })

    _this.bindResizeMove = resizeMove.bind(_this)
    window.addEventListener('mousemove',_this.bindResizeMove)
    _this.bindResizeUp = resizeUp.bind(_this)
    window.addEventListener('mouseup',_this.bindResizeUp)
    _this.bindUnActive = onUnActive.bind(_this)
    window.addEventListener('mousedown',_this.bindUnActive)

    domEl.appendChild(control_tl)
    domEl.appendChild(control_tm)
    domEl.appendChild(control_tr)
    domEl.appendChild(control_mr)
    domEl.appendChild(control_br)
    domEl.appendChild(control_bm)
    domEl.appendChild(control_bl)
    domEl.appendChild(control_ml)
}

export function removeResizeMethods(_this) {
    for(let i = 0;i<_this.resizeHandle.length; i++) {
        _this.domEl.removeChild(_this.resizeHandle[i])
    }
    _this.resizeHandle = []
    window.removeEventListener('mousemove',_this.bindResizeMove)
    window.removeEventListener('mouseup',_this.bindResizeUp)
    window.removeEventListener('mousedown',_this.bindUnActive)
}