if (localStorage.getItem("theme") === undefined || localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
}
if (localStorage.getItem("theme") === "light") {
    document.querySelector("button#theme").querySelector("img").src = "./cdn/img/moon.png";
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    document.body.classList.add("fade");
}
//      Change the theme
document.querySelector("button#theme").onclick = function() {
    this.classList.remove("fade");
    document.body.classList.remove("fade");
    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark");
        this.querySelector("img").src = "./cdn/img/sun.png";
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        document.body.classList.add("fade");
    } else {
        localStorage.setItem("theme", "light");
        this.querySelector("img").src = "./cdn/img/moon.png";
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        document.body.classList.add("fade");
    }
    this.classList.add("fade");
    setTimeout(function() { document.body.classList.remove("fade"); }, 500);
}