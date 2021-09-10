import { Accelerator } from "../src/index.js"

window.onload = () => {
    const domEl = document.querySelector('#addDom')
    let ac 
    let flag = true
    document.querySelector('#add').addEventListener('click',function(e) {
        e.stopPropagation();
        console.log('点击事件触发')
        const domEl = document.createElement('div')
        domEl.classList = "addDom"
        const father = document.querySelector('.father')
        father.appendChild(domEl)
        const ac = new Accelerator(domEl,{
           width:'200px',
           height:'200px',
           ratio:1
        })

        ac.on('select',function(e) {
            ac.setzIndexToTop()
        })
       
    })
    document.querySelector('#clear').onclick = () => {
        Accelerator.destroyAll()
    }
}