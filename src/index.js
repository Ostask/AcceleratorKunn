class Accelerator {
    constructor(config){
        this.x = config.x
        this.y = config.y
        this.width = config.width
        this.height = config.height
        this.setConfig()
    }
    setConfig(){
        console.log("初始化咯")
    }
}

window.Accelerator = Accelerator
export default Accelerator