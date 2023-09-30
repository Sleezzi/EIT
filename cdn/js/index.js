const cuttedPage = window.location.href.split("/");
document.addEventListener("DOMContentLoaded", async function() {
    document.getElementById("openBtn").onclick = function() {
        document.getElementById("sideNav").classList.add("active");
    };
    document.getElementById("closeBtn").onclick = function() {
        document.getElementById("sideNav").classList.remove("active");
    };
    
    const resplang = { "en": "English", "fr": "Français", "es": "Español" };
    for (const lang in resplang) {
        if (Object.hasOwnProperty.call(resplang, lang)) {
            const element = document.createElement("option");
            element.id = lang;
            element.value = lang;
            element.innerText = resplang[lang];
            if (lang === cuttedPage[window.location.href.split("/").length-2]) document.getElementById("lang").ariaSelected = `${lang}`;
            document.getElementById("lang").appendChild(element);
        }
    }
    
    for (let i = 0; i < document.getElementById("lang").options.length; i++) {
        if (document.getElementById("lang").options[i].value === cuttedPage[window.location.href.split("/").length-2]) {
            document.getElementById("lang").selectedIndex = i;
            break;
        }
    }
    
    document.getElementById("lang").addEventListener("change", function() {
        if (cuttedPage[window.location.href.split("/").length-2] === event.target.id) return;
        window.location.href = `https://${window.location.host}/${cuttedPage[window.location.href.split("/").length-3]}/${event.target.value ?? event.target.id}/index.html`;
    });
});
