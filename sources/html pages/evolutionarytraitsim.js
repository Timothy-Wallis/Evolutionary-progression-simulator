import DeltaTime from "./assets/deltatime.js";

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
        this.color = "transparent";
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
let timeline = [];

const colors = ["brown", "white"];
let priorityColor = colors[0];

//main loop
function main(){
    console.log("Running Main Loop");
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
    ctx.fillStyle = "skyblue";
    ctx.font = "24px Arial";
    ctx.fillText(`Current Year: ${iterationCount} | White: ${countType("white")} | Brown: ${countType("brown")}`, 20, 40);
    if(timer <= 0){
        timer = lifeSpanInput;
        iterationCount++;
        timeline.push({year: iterationCount, brown: countType("brown"), white: countType("white")});
        ColorAddItems(colors[0]);
        ColorAddItems(colors[1]);
    }
}

function ColorAddItems(colorType){
    let count = countType(colorType);
    for(let i = 0; i < Math.floor(count / 2); i++){
        let randomTimer;
        if(priorityColor == colorType){
            randomTimer = Math.floor((Math.random() - .01) * timer + 1000);
        }else{
            randomTimer = Math.floor((Math.random() - .25) * timer + 1000);
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
            randomTimer = Math.floor((Math.random() - .01) * timer + 1000);
        }else{
            randomTimer = Math.floor((Math.random() - .25) * timer + 1000);
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
        label.textContent = "Current Color: White";
    }else{
        priorityColor = colors[0];
        label.textContent = "Current Color: Brown";
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
document.getElementById("graphBtn").addEventListener("click", generateGraph);

let graphOpen = false;

function generateGraph(){
    if(graphOpen){
        graphOpen = false;
        document.getElementById("graphBtn").value = "Show Graph";
        main();
    }else{
        graphOpen = true;
    document.getElementById("graphBtn").value = "Close Graph";
    pauseSim();
    //Graph Code
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 4 + 10, canvas.height / 4 + 10);
    ctx.lineTo(canvas.width / 4 + 10, canvas.height / 2 - 10);
    ctx.lineTo(canvas.width / 2 - 10, canvas.height / 2 - 10);
    ctx.stroke();
    //Plot Data
}}