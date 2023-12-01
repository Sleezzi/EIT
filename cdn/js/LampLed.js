const product = window.location.href.split("/")[window.location.href.split("/").length-1].replace(".html", "");
let image = {
    current: 1,
    pictures: [ document.querySelector("#image").src ]
};
document.querySelector("#image").onmouseup = function() {
    if (image.current === image.pictures.length) {
        image.current = 1;
        this.innerHTML = `<img alt="Picture1" style="height: 100%; width: 100%;" src="${image.pictures[0]}">`;
    } else {
        image.current += 1;
        this.innerHTML = `<img alt="Picture${image.current}" style="height: 100%; width: 100%;" src="${image.pictures[image.current-1]}">`;
    }
}
fetch(`./cdn/products.json`, { method: "GET" }).then(resp => {if (resp.status === 200) return resp.json()}).then(response => {
    const data = response[product][localStorage.getItem("lang")];
    
    document.querySelector("#product").innerText = data.name ?? product;
    document.querySelector("#description").innerText = data.description;
    document.querySelector("#price").innerText = data.price;

    const img = document.createElement("img");
    img.style = "height: 25%; width: 10%; margin: 2px;";
    img.src = `./cdn/img/caddie.png`;
    document.querySelector("#buy").appendChild(img);

    const span = document.createElement("span");
    span.style = "color: black;";
    span.ariaLabel = data.buy;
    span.innerHTML = data.buy;
    document.querySelector("#buy").appendChild(span);

    document.title = `EIT - ${product}`;
    document.querySelector("#charContent > h3").innerText = data.char[0].title;
    data.char.forEach(char => {
        if (!char.name || !char.value) return;
        const span = document.createElement("span");
        span.style = "text-align: center; margin: 5px;";
        span.innerHTML = `${char.name}: ${char.value}`;
        document.querySelector("#charContent").appendChild(span);
    });
    image.pictures = response[product].pictures;
    document.querySelector("#image").innerHTML = `<img style="height: 100%; width: 100%;" src="./cdn/products/${product}/1.png">`;
});

document.querySelector("#openBtn").onclick = function() {
    document.querySelector("#sideNav").classList.add("active");
};
document.querySelector("#closeBtn").onclick = function() {
    document.querySelector("#sideNav").classList.remove("active");
};