let controller = 0;
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
            this.timer -= deltaTime.update();
            return;
        }
        this.color = "transparent";
        controller++;
        delete this;
        return;
    }
    moveRandom(){
        let posx = (Math.random() - 0.5) * 1.5;
        let posy = (Math.random() - 0.5) * 1.5;

        if(this.x + posx < 0 || this.x + posx > canvas.width){
            posx = -posx;
        }
        if(this.y + posy < 0 || this.y + posy > canvas.height){
            posy = -posy;
        }
        
        this.x += posx;
        this.y += posy;
    }
}

class DeltaTime {
    constructor(){
        this.startTime = performance.now();
        this.timestamp = this.startTime;
    }
    update(){
        let now = performance.now();
        this.delta = now - this.timestamp;
        this.timestamp = now;
        return this.delta;
    }
}
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let lifeSpanInput = document.getElementById("lifeSpanInput").value;
let deltaTime = new DeltaTime();

let objects = [];
let animationController = null;
let animationEnable = false;
let prgmRun = false;
let timer = lifeSpanInput; //Timer used for each iteration
let iterationCount = 1;

const colors = ["brown", "white"];
let priorityColor = colors[0];

//main loop
function main(){
    timer -= deltaTime.update();
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
    ctx.fillStyle = "blue";
    ctx.font = "24px Arial";
    ctx.fillText(`Current Year: ${iterationCount}`, 10, 20);
    if(timer <= 0){
        timer = lifeSpanInput;
        iterationCount++;
        ColorAddItems(colors[0]);
        ColorAddItems(colors[1]);
    }
}

function ColorAddItems(colorType){
    let count = countType(colorType);
    for(let i = 0; i < Math.floor(count / 2); i++){
        let randomTimer;
        if(priorityColor == colorType){
            randomTimer = Math.floor((Math.random() - .01) * 1000 + timer);
        }else{
            randomTimer = Math.floor((Math.random() - .7) * 1000 + timer);
        }
        objects.push(new Obj(Math.random() * canvas.width, Math.random() * canvas.height, randomTimer, colorType));
    }
}

function countType(colorType){
    let colorCount = {
        brown: 0,
        white: 0
    }
    for(let i = 0; i < objects.length; i++){
        if(objects[i].color == colorType){
            colorCount[colorType]++;
        }
    }
    return colorCount[colorType];
}


//Start the simulation
function startSim() {
    if(!prgmRun){
        prgmRun = true;
        updateRenderArray();
    }
    if(!animationEnable){
        animationEnable = true;
        main();
        return;
    }
}

function updateRenderArray(){
    //Updates render array based on the amount to be generated
    let amount = document.getElementById("amountInput").value;
    if(objects.length > 0){
        objects = [];
    }
    for(let i = 0; i < amount; i++ ){
        let tempCount = amount/2;
        let tempColor = colors[0];
        let randomTimer;
        if(i < tempCount){
            tempColor = colors[0];
        }else{
            tempColor = colors[1];
        }
        if(tempColor == priorityColor){
            randomTimer = Math.floor((Math.random() - .25) * 1000 + timer);
        }else{
            randomTimer = Math.floor((Math.random() - .5) * 1000 + timer);
        }
        objects.push(new Obj(Math.random() * canvas.width, Math.random() * canvas.height, randomTimer, tempColor));
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
    prgmRun = false;
    iterationCount = 0;
}

document.getElementById("startBtn").addEventListener("click", startSim);
document.getElementById("pauseBtn").addEventListener("click", pauseSim);
document.getElementById("changeColorBtn").addEventListener("click", changePriorityColor);
document.getElementById("resetBtn").addEventListener("click", resetSim);

//Correct current input values
function checkNumberInput(inputElement, min, max){
    let currVal = parseInt(inputElement.value);
    if(currVal < min){
        inputElement.value = min;
    }else if(currVal > max){
        inputElement.value = max;
    }
}

document.getElementById("amountInput").addEventListener("change", () => checkNumberInput(document.getElementById("amountInput"), 4, 50));
document.getElementById("lifeSpanInput").addEventListener("change", () => checkNumberInput(document.getElementById("lifeSpanInput"), 1000, 10000));