import { Accelerator } from "../src/index.js"

window.onload = () => {
    const domEl = document.querySelector('#addDom')
    let ac 
    let flag = true
    document.querySelector('#add').onclick = () => {
        const domEl = document.createElement('div')
        domEl.classList = "addDom"
        domEl.innerHTML = '<p>123<p>'
        document.body.appendChild(domEl)
        const ac = new Accelerator(domEl,{
            x:'0%',
            y:'0%',
            width:'10%',
            height:'10%'
        })
    }
    document.querySelector('#set').onclick = () => {
        console.log('click')
        flag = !flag
        ac.attr('x','70%')
    }
    document.querySelector('#clear').onclick = () => {
        Accelerator.destroyAll()
    }
}