import { Accelerator } from "../src/index.js"

window.onload = () => {
    const domEl = document.querySelector('#addDom')
    let ac 
    let flag = true
    document.querySelector('#add').onclick = () => {
        const domEl = document.createElement('div')
        domEl.classList = "addDom"
        document.body.appendChild(domEl)
        const ac = new Accelerator(domEl,{
            x:'0%',
            y:'0%',
            width:'10%',
            height:'10%'
        })
        ac.on('destroyed',function() {
            console.log('被销毁了')
        })
        ac.on('beforeDestroy',function() {
            console.log('马上被销毁了')
        })
        ac.on('dragStart',function() {
            console.log('开始拖拽')
        })
        ac.on('dragMove',function() {
            console.log('在拖拽')
        })
        ac.on('dragEnd',function() {
            console.log('拖拽结束')
        })
        ac.on('zoomStart',function() {
            console.log('开始缩放')
        })
        ac.on('zoomMove',function(e) {
            console.log('缩放类型'+e.type)
        })
        ac.on('zoomEnd',function(e) {
            console.log('缩放结束')
        })
        ac.on('resize',function(e) {
            console.log('父元素大小改变')
        })
        ac.on('update',function(e) {
            console.log('更新了config')
        })
        ac.on('select',function(e) {
            console.log('选中了')
        })
    }
    document.querySelector('#clear').onclick = () => {
        Accelerator.destroyAll()
    }
}