class Obj {
    constructor(x, y, timer, color){
        this.x = x;
        this.y = y;
        this.timer = timer;
        this.color = color;
    }
    update(){
        if(this.timer > 0){
            this.moveRandom();
            this.timer--;
            return;
        }
        delete this;
        return;
    }
    moveRandom(){
        this.x += (Math.random() - 0.5) * 10;
        this.y += (Math.random() - 0.5) * 10;
    }
}

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let objects = [];
let animationController = null;
let animationEnable = false;

const colors = ["brown", "white"];
let priorityColor = colors[0];

//main loop
function main(){
   animationController = requestAnimationFrame(main);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < objects.length; i++){
        let obj = objects[i];
        obj.update();
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}


//Start the simulation
function startSim() {
    if(!animationEnable){
        animationEnable = true;
        main();
        return;
    }
}

//Pause the simulation
function pauseSim() {
    cancelAnimationFrame(animationController);
    animationEnable = false;
}
//Change color of all objects
function changePriorityColor() {
    let label = document.querySelector("label[for='changeColorBtn']");
    if(priorityColor == colors[0]){
        priorityColor = colors[1];
        label.textContent = "Current Color Priority: White";
    }else{
        priorityColor = colors[0];
        label.textContent = "Current Color Priority: Brown";
    }
}

function resetSim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects = [];
    pauseSim();
}

document.getElementById("startBtn").addEventListener("click", startSim);
document.getElementById("pauseBtn").addEventListener("click", pauseSim);
document.getElementById("changeColorBtn").addEventListener("click", changePriorityColor);
document.getElementById("amountInput").addEventListener("change", () => {
    let amount = document.getElementById("amountInput").value;
    //Check if input is within range
    if(amount < 4) {
        document.getElementById("amountInput").value = 4;
    } else if(amount > 50) {
        document.getElementById("amountInput").value = 50;
    }
    //After values corrected, append to list
    amount = document.getElementById("amountInput").value;
    if(objects.length > 0){
        objects = [];
    }
    for(let i = 0; i < amount; i++ ){
        let tempCount = amount/2;
        let tempColor = colors[0];
        let randomTimer;
        if(i <= tempCount){
            tempColor = colors[0];
        }else{
            tempColor = colors[1];
        }
        if(tempColor == priorityColor){
            randomTimer = Math.floor((Math.random() - .25) * 1000 + 5000);
        }else{
            randomTimer = Math.floor((Math.random() - .5) * 1000 + 5000);
        }
        objects.push(new Obj(Math.random() * canvas.width, Math.random() * canvas.height, randomTimer, tempColor));
    }
});
document.getElementById("resetBtn").addEventListener("click", resetSim);