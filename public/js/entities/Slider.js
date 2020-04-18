class Slider{
    constructor(windows = []){
        this.windows = windows;
        this.presentWindow(0);
        this.currentWindow = 0;
    }

    addWindow(w){
        this.windows.push(w);
    }

    next(){
        this.presentWindow(this.currentWindow+1);
    }

    previows(){
        this.presentWindow(this.currentWindow-1);
    }

    presentWindow(windowIndex, callback){
        if(windowIndex >= 0 && windowIndex < this.windows.length){
            this.windows.forEach(w => {
                w.style.display = "none";
            });
            this.windows[windowIndex].style.display = "block";
            this.currentWindow = windowIndex;
            if(callback) callback();
        }
    }
}