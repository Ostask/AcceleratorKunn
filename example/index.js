import { Accelerator } from "../src/index.js"

window.onload = () => {
    const domEl = document.querySelector('#addDom')
    let ac 
    let flag = true
    document.querySelector('#add').onclick = () => {
        ac && ac.destroy()
        ac = new Accelerator(domEl)
    }
    document.querySelector('#set').onclick = () => {
        console.log('click')
        flag = !flag
        ac.attr('x','70%')
    }
    document.querySelector('#clear').onclick = () => {
        ac.destroy()
    }
}