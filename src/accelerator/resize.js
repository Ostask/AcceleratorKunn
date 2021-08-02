import {
    addPrefix,
    prevent
} from '../utils/common'

export function addControl(domEl) {
    const style = 'border:1px solid #000;width:10px;height:10px;background-color:#fff;position:absolute;'

    const control_tl = document.createElement('div')
    const control_tm = document.createElement('div')
    const control_tr = document.createElement('div')
    const control_mr = document.createElement('div')
    const control_br = document.createElement('div')
    const control_bm = document.createElement('div')
    const control_bl = document.createElement('div')
    const control_ml = document.createElement('div')

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

export function resizedown(e, mode, _this) {
    prevent(e)
    _this.resizeOrign.x = e.pageX
    _this.resizeOrign.y = e.pageY
    _this.isdragging = false
    _this.resizeMode = mode
    _this.domEl.style.userSelect = 'none'
}

export function resizeMove(e) {
    let newWidth,newHeight,newX,newY,moveX,moveY,newY1,newX1
    const _this = this
    function moveUp(){
        //加减y和height
        newY = _this.y.num + moveY
        newHeight = _this.height.num - moveY
        newY1 = newY + newHeight
        if(!_this.dragOutable){
            const minY = 0
            const maxY = newY1
            const minHeight = 0
            const maxHeight = newY1
            newY = Math.min(maxY,Math.max(minY,newY))
            newHeight = Math.min(maxHeight,Math.max(minHeight,newHeight))
        }
        _this.y.num = newY
        _this.height.num = newHeight
        _this.y1.num = newY + newHeight
    }
    function moveDown(){
        //加减height
        newHeight = _this.height.num + moveY
        if(!_this.dragOutable){
            const minHeight = 0
            const maxHeight = _this.parentElHeight - _this.y.num
            newHeight = Math.min(maxHeight,Math.max(minHeight,newHeight))
        }
        _this.height.num = newHeight
    }
    function moveLeft(){
        //加减x和width
        newX = _this.x.num + moveX
        newWidth = _this.width.num - moveX
        newX1 = newX + newWidth
        if(!_this.dragOutable){
            const minX = 0
            const maxX = newX1
            const minWidth = 0
            const maxWidth = newX1
            newX = Math.min(maxX,Math.max(minX,newX))
            newWidth = Math.min(maxWidth,Math.max(minWidth,newWidth))
        }
        _this.x.num = newX
        _this.width.num = newWidth
        _this.x1.num = newX + newWidth
    }
    function moveRight(){
        //加减width
        newWidth = _this.width.num + moveX
        if(!_this.dragOutable){
            const minWidth = 0
            const maxWidth = _this.parentElWidth - _this.x.num
            newWidth = Math.min(maxWidth,Math.max(minWidth,newWidth))
        }
        _this.width.num = newWidth
    }
    if(this.resizeMode){
        moveX = e.pageX - this.resizeOrign.x
        moveY = e.pageY - this.resizeOrign.y
        //根据resizeMode，计算x,y,width,height的新值
        //根据resizeMode，判断x,y,width,height的最大最小值
        switch(this.resizeMode) {
            case 'tl':
                moveUp()
                moveLeft()
                break;
            case 'tm':
                moveUp()
                break;
            case 'tr':
                moveUp()
                moveRight()
                break;
            case 'mr':
                moveRight()
                break;
            case 'br':
                moveDown()
                moveRight()
                break;
            case 'bm':
                moveDown()
                break;
            case 'bl':
                moveDown()
                moveLeft()
                break;
            case 'ml':
                moveLeft()
                break;                            
        }
        this.resizeOrign.x = e.pageX
        this.resizeOrign.y = e.pageY

        this._setStyle()
        this._updatePositionConfig()
    }
}

export function resizeUp(e) {
    this.resizeMode = null
    this.domEl.style.userSelect = 'auto'
}

export function setResizeMethods(_this) {
    //先给添加8个控制柄
    const {control_tl, control_tm, control_tr, control_mr, control_br, control_bm, control_bl,control_ml } = addControl(_this.domEl)
    const domEl = _this.domEl
    _this.resizeHandle = [control_tl, control_tm, control_tr, control_mr, control_br, control_bm, control_bl,control_ml]

    //给控制柄添加事件
    //按下按钮的时候记录当前控制大小的方式
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
}