async function loadComponent(id, file) {
    const element = document.getElementById(id);

    const response = await fetch(file);

    const data = await response.text();

    element.innerHTML = data;
}

loadComponent("header", "componentes/header.html");

loadComponent("footer", "componentes/footer.html");