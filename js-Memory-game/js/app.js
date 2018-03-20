let card = document.querySelector(".card");
card.addEventListener("click", (e) => {
    e.target.parentNode.style.transform = "rotateY(180deg)";
})
