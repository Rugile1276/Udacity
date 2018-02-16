// Select color input
// Select size input

let sizePicker = document.getElementById("sizePicker");
let table = document.getElementById("pixelCanvas");
let gridHeight;
let gridWidth;
let color;

sizePicker.addEventListener("submit", (e) => {
    e.preventDefault();
    if(table.hasChildNodes()){
        table.textContent = '';
    }
    makeGrid();
});

// When size is submitted by the user, call makeGrid()

function makeGrid() {

    gridHeight = document.getElementById("inputHeight").value;
    gridWidth = document.getElementById("inputWeight").value;

    for(let i= 0; i < gridHeight; i++){
        let a = table.appendChild(document.createElement('tr'));
        for(let i= 0; i < gridWidth; i++){
            a.appendChild(document.createElement('td'));
        }
    }

    table.addEventListener("click", (e) => {
        color = document.getElementById("colorPicker").value;
        e.target.style.background = color;
    })
}
