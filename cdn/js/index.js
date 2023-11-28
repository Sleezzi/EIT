if (localStorage.getItem("lang") === undefined || localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", navigator.language.replace(navigator.language.slice(2), ""));
}
if (localStorage.getItem("theme") === undefined || localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
}
if (localStorage.getItem("theme") === "light") {
    document.querySelector("button#theme").querySelector("img").src = "./cdn/img/moon.png";
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    document.body.classList.add("fade");
}

fetch("./cdn/lang.json", { method: "GET", cache: "no-cache", mode: "no-cors" }).then(resp => {if (resp.status === 200) return resp.json()}).then(response => {
//      Add the language to the language selector
    if (response[localStorage.getItem("lang")]) {
        for (const object in response[localStorage.getItem("lang")]) {
            if (typeof object === "string" && document.querySelector(`#${object}`)) {
                document.querySelector(`#${object}`).innerHTML = response[localStorage.getItem("lang")][object];
            }
        }
        document.querySelector("html").lang = localStorage.getItem("lang");
    }
    for (const lang in response) {
        if (Object.hasOwnProperty.call(response, lang)) {
            const element = document.createElement("option");
            element.id = lang;
            element.value = lang;
            element.innerText = response[lang].name;
            if (lang === localStorage.getItem("lang")) element.selected = true;
            document.getElementById("lang").appendChild(element);
        }
    }
});

//      Redirect the user when they change the language
document.getElementById("lang").addEventListener("change", function(event) {
    if (localStorage.getItem("lang") === event.target.id) return;
    localStorage.setItem("lang", event.target.value);
    console.log(`Changing lang to ${event.target.value}`);
    window.location.reload();
});

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
document.getElementById("openBtn").onclick = function() {
    document.getElementById("sideNav").classList.add("active");
};
document.getElementById("closeBtn").onclick = function() {
    document.getElementById("sideNav").classList.remove("active");
};