const product = window.location.href.split("/")[window.location.href.split("/").length-1].replace(".html", "");
if (localStorage.getItem("theme") === undefined || localStorage.getItem("theme") === null) localStorage.setItem("theme", "dark");
if (localStorage.getItem("theme") === "dark") {
    document.getElementById("theme").querySelector("img").src = `./cdn/img/sun.png`;
} else {
    document.getElementById("theme").querySelector("img").src = `./cdn/img/moon.png`;
    document.body.classList.remove("dark");
    document.body.classList.add("light");
}
document.getElementById("theme").onmouseup = function() {
    this.classList.remove("fade");
    document.body.classList.remove("fade");
    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark");
        this.querySelector("img").src = `./cdn/img/sun.png`;
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        document.body.classList.add("fade");
    } else {
        localStorage.setItem("theme", "light");
        this.querySelector("img").src = `./cdn/img/moon.png`;
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        document.body.classList.add("fade");
    }
    this.classList.add("fade");
    setTimeout(function() { document.body.classList.remove("fade"); }, 500);
}
document.getElementById("image").onmouseup = function() {
    const image = localStorage.getItem("image");
    if (JSON.parse(image).current === JSON.parse(image).max) {
        localStorage.setItem("image", JSON.stringify({ current: 1, max: JSON.parse(image).max }));
        this.innerHTML = `<img alt="Picture1" style="height: 100%;width: 100%;" src="./cdn/products/${product}/1.png">`;
    } else {
        localStorage.setItem("image", JSON.stringify({ current: JSON.parse(image).current+1, max: JSON.parse(image).max }));
        this.innerHTML = `<img alt="Picture${JSON.parse(image).current+1}" style="height: 100%;width: 100%;" src="./cdn/products/${product}/${JSON.parse(image).current+1}.png">`;
    }
}
fetch(`./cdn/products.json`, { method: "GET" }).then(resp => {if (resp.status === 200) return resp.json()}).then(response => {
    const data = response[product][localStorage.getItem("lang")];
    
    const img = document.createElement("img");         
    img.style = "height: 25%; width: 10%; margin: 2px;";
    img.src = `./cdn/img/caddie.png`;
    const span = document.createElement("span");
    span.style = "color: black;";
    span.ariaLabel = data.buy;
    span.innerHTML = data.buy;
    document.getElementById("product").innerText = data.name ?? product;
    document.getElementById("description").innerText = data.description;
    document.getElementById("price").innerText = data.price;
    document.getElementById("buy").appendChild(img);
    document.getElementById("buy").appendChild(span);
    document.title = `EIT - ${product}`;
    document.querySelector("#charContent > h3").innerText = data.char[0].title;
    data.char.forEach(char => {
        if (!char.name || !char.value) return;
        const span = document.createElement("span");
        span.style = "text-align: center; margin: 5px;";
        span.innerHTML = `${char.name}: ${char.value}`;
        document.getElementById("charContent").appendChild(span);
    });
    localStorage.setItem("image", JSON.stringify({ current: 1, max: response[product].pictures.length }));
    document.getElementById("image").innerHTML = `<img style="height: 100%;width: 100%;" src="./cdn/products/${product}/1.png">`;
});