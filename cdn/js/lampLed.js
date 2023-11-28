const cuttedPage = window.location.href.split("/");
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
        this.innerHTML = `<img style="height: 100%;width: 100%;" src="./cdn/products/${cuttedPage[window.location.href.split("/").length-1].replace(".html", "")}/1.png">`;
    } else {
        localStorage.setItem("image", JSON.stringify({ current: JSON.parse(image).current+1, max: JSON.parse(image).max }));
        this.innerHTML = `<img style="height: 100%;width: 100%;" src="./cdn/products/${cuttedPage[window.location.href.split("/").length-1].replace(".html", "")}/${JSON.parse(image).current+1}.png">`;
    }
}
fetch(`./cdn/products.json`, { method: "GET" }).then(resp => {if (resp.status === 200) return resp.json()}).then(response => {
    const data = response[cuttedPage[`${window.location.href.split("/").length-1}`].replace(".html", "")][cuttedPage[window.location.href.split("/").length-2 ?? document.querySelector("html").lang]];
    
    const img = document.createElement("img");         
    img.style = "height: 25%; width: 10%; margin: 2px;";
    img.src = `./cdn/img/caddie.png`;
    const span = document.createElement("span");
    span.style = "color: black;";
    span.ariaLabel = data.buy;
    span.innerHTML = data.buy;
    document.getElementById("title").innerText = data.name ?? cuttedPage[window.location.href.split("/").length-1].replace(".html", "");
    document.getElementById("description").innerText = data.description;
    document.getElementById("price").innerText = data.price;
    document.getElementById("buy").appendChild(img);
    document.getElementById("buy").appendChild(span);
    document.getElementById("home").setAttribute("href", `./${cuttedPage[window.location.href.split("/").length-2]}/index.html`);
    document.title = `${cuttedPage[`${window.location.href.split("/").length-3}`]} - ${cuttedPage[window.location.href.split("/").length-1].replace(".html", "")}`;
    document.getElementById("charTitle").innerText = data.char[0].title;
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = `./${cuttedPage[window.location.href.split("/").length-1].replace(".html", "")}.css`;
    document.head.appendChild(style);
    data.char.forEach(char => {
        if (!char.name || !char.value) return;
        const span = document.createElement("span");
        span.style = "text-align: center; margin: 5px;";
        span.innerHTML = `${char.name}: ${char.value}`;
        document.getElementById("charContent").appendChild(span);
    });
    localStorage.setItem("image", JSON.stringify({ current: 1, max: response[cuttedPage[window.location.href.split("/").length-1].replace(".html", "")].pictures.length }));
    document.getElementById("image").innerHTML = `<img style="height: 100%;width: 100%;" src="./cdn/products/${cuttedPage[window.location.href.split("/").length-1].replace(".html", "")}/1.png">`;
});