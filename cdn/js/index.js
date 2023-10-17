const cuttedPage = window.location.href.split("/");
//          Wait for the page to load
document.addEventListener("DOMContentLoaded", async function() {
    document.getElementById("openBtn").onclick = function() {
        document.getElementById("sideNav").classList.add("active");
    };
    document.getElementById("closeBtn").onclick = function() {
        document.getElementById("sideNav").classList.remove("active");
    };
    //      Retrieves the list of available languages
    fetch("/EIT/cdn/lang.json", { method: "GET", cache: "no-cache", mode: "no-cors" }).then(resp => {if (resp.status === 200) return resp.json()}).then(response => {
    
        if ((localStorage.getItem("lang") === undefined || localStorage.getItem("lang") === null) && Object.hasOwnProperty.call(response, navigator.language.replace(navigator.language.slice(2), ""))) {
            localStorage.setItem("lang", navigator.language.replace(navigator.language.slice(2), ""));
            return window.location.href = `https://${window.location.host}/${cuttedPage[cuttedPage.length-3]}/${navigator.language.replace(navigator.language.slice(2), "")}/index.html`;
        }

    //      Add the language to the language selector
        for (const lang in response) {
            if (Object.hasOwnProperty.call(response, lang)) {
                const element = document.createElement("option");
                element.id = lang;
                element.value = lang;
                element.innerText = lang.name;
                if (lang === cuttedPage[cuttedPage.length-2]) document.getElementById("lang").ariaSelected = `${lang}`;
                document.getElementById("lang").appendChild(element);
            }
        }
    });
    //      Place the selector on the current language
    for (let i = 0; i < document.getElementById("lang").options.length; i++) {
        if (document.getElementById("lang").options[i].value === cuttedPage[cuttedPage.length-2]) {
            document.getElementById("lang").selectedIndex = i;
            break;
        }
    }
    
    //      Redirect the user when they change the language
    document.getElementById("lang").addEventListener("change", function() {
        if (cuttedPage[cuttedPage.length-2] === event.target.id) return;
        localStorage.setItem("lang", event.target.value ?? event.target.id);
        window.location.href = `https://${window.location.host}/${cuttedPage[cuttedPage.length-3]}/${event.target.value ?? event.target.id}/index.html`;
    });

    //      Change the theme
    document.querySelector("button#theme").onclick = function() {
        this.classList.remove("fade");
        document.body.classList.remove("fade");
        if (localStorage.getItem("theme") === "light") {
            localStorage.setItem("theme", "dark");
            this.querySelector("img").src = "/EIT/cdn/img/sun.png";
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            document.body.classList.add("fade");
        } else {
            localStorage.setItem("theme", "light");
            this.querySelector("img").src = "/EIT/cdn/img/moon.png";
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            document.body.classList.add("fade");
        }
        this.classList.add("fade");
        setTimeout(function() { document.body.classList.remove("fade"); }, 500)
    }
});
