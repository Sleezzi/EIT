document.getElementById("openBtn").onclick = function() {
    document.getElementById("sideNav").classList.add("active");
};
document.getElementById("closeBtn").onclick = function() {
    document.getElementById("sideNav").classList.remove("active");
};

fetch("./cdn/products.json", { method: "GET" }).then(resp => { if (resp.status === 200) return resp.json() }).then(response => {
    for (product in response) {
        if (response[product].thumbnail &&
            response[product].en &&
            (response[product].href ?? response[product].id) &&
            response[product].en.name &&
            response[product].en.description &&
            response[product].en.price
        ) {
            const card = document.createElement("a");
            card.classList.add("container");
            card.href = response[product].href ?? `./${response[product].id}`;
            card.id = response[product].id;
            card.innerHTML = `
<div style="height: 75%;width: 100%; display: flex; justify-content: center; align-items: center;">
    <img style="height: 90%;width: 90%;" src="${response[product].thumbnail}" alt="${response[product][localStorage.getItem("lang")].name}">
</div>
<div style="height: 25%; width: 100%;">
    <h3>${response[product][localStorage.getItem("lang")].name} - ${response[product][localStorage.getItem("lang")].price}</h3>
    <p>${response[product][localStorage.getItem("lang")].description}</p>
</div>`;
            document.querySelector("#content").appendChild(card);
        }
    }
});