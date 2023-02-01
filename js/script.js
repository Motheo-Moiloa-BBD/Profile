let burger = document.querySelector("#burger_menu");
let nav = document.querySelector("nav");

burger.addEventListener("click", () => {
    nav.classList.toggle("show");
});

let navigationLinks = document.querySelectorAll(".nav_link");

navigationLinks.forEach((link) =>
    link.addEventListener("click", () =>
    {
        nav.classList.remove("show");
    })
);

async function getData(){
    let response = await fetch('https://techy-api.vercel.app/api/json');
    let data = await response.json();

    document.getElementById('message_display').innerText = data.message;
};

