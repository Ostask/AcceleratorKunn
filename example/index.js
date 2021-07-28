import { Accelerator, Directive } from "../src/index.js"

console.log(Directive)
window.onload = () => {
    Accelerator.setStaticConfig({
        y:'20px',
        width:'20%'
    })
    document.querySelector('#add').onclick = () => {
        const dom = document.createElement('div')
        dom.style.background = '#ff0000'
        document.body.appendChild(dom)
        new Accelerator(dom,{
            autoCount: true
        })
    }
}