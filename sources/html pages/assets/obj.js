
export default class Obj {
    constructor(x, y, timer, color){
        this.x = x;
        this.y = y;
        this.timer = timer;
        this.color = color;
        this.canvas = document.getElementById("simCanvas");
    }
    update(){
        if(this.timer > 0){
            this.moveRandom();
            this.timer--;
            return;
        }
        this.color = "transparent";
        delete this;        
        return;
    }
    moveRandom(){
        let posx = (Math.random() - 0.5) * 1.5;
        let posy = (Math.random() - 0.5) * 1.5;

        if(this.x + posx < 0 || this.x + posx > this.canvas.width){
            posx = -posx;
        }
        if(this.y + posy < 0 || this.y + posy > this.canvas.height){
            posy = -posy;
        }
        
        this.x += posx;
        this.y += posy;
    }
}