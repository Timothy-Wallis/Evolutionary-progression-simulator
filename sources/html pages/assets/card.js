export default class Card {
    constructor(title, x, y, width, height, image, description = ""){
        this.title = title;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.description = description;
    }
    createCard(){
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.left = `${this.x}px`;
        card.style.top = `${this.y}px`;
        card.style.width = `${this.width}px`;
        card.style.height = `${this.height}px`;
        let title = document.createElement("h2");
        title.innerText = this.title;
        let img = document.createElement("img");
        img.src = this.image;
        let desc = document.createElement("p");
        desc.innerText = this.description;
        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(desc);
        document.body.appendChild(card);
        card.addEventListener("click", () => {
            for(let opacity = 1; opacity >= 0; opacity -= 0.1){
                card.style.opacity = opacity;
            }
        });
    }

}