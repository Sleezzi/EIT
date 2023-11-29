if (localStorage.getItem("lang") === undefined || localStorage.getItem("lang") === null) {
    localStorage.setItem("lang", navigator.language.replace(navigator.language.slice(2), ""));
}
//      Redirect the user when they change the language
document.getElementById("lang").addEventListener("change", function(event) {
    if (localStorage.getItem("lang") === event.target.id) return;
    localStorage.setItem("lang", event.target.value);
    console.log(`Changing lang to ${event.target.value}`);
    window.location.reload();
});

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