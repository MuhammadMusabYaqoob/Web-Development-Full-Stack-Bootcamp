const generateBtn = document.querySelector("#generateBtn");
const favBtn = document.querySelector("#favBtn")
const favorites = document.querySelector("#favorites"); 
const body = document.querySelector("body");
const colorValue = document.querySelector("#colorValue");
const alertBox = document.querySelector(".alert-box")
const message = document.querySelector(".message")
const okButton = document.querySelector(".ok-button")
const clear = document.querySelector("#clear")
const defaultBtn = document.querySelector("#default")

let currentColor = "";


// Load saved colors from localStorage
let favoriteColors;

if (localStorage.getItem("favoriteColors")) {
    favoriteColors = JSON.parse(localStorage.getItem("favoriteColors"));
} else {
    favoriteColors = [];
}
// Show saved colors in dropdown when page loads
favoriteColors.forEach(function (color) {
  const option = document.createElement("option");
  option.textContent = color;
  option.value = color;
  favorites.appendChild(option);
});
if (favoriteColors.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No Colors Saved";
    option.disabled = true;
    option.selected = true;

    favorites.appendChild(option);
}
function getRandomColor() {
    const chars = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        // make the color with # and 6 characters
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
}

generateBtn.addEventListener("click", function () {
    currentColor = getRandomColor();
    body.style.backgroundColor = currentColor;

    colorValue.style.display = "block";
    colorValue.textContent = currentColor;
});

colorValue.addEventListener("click", function () {
    navigator.clipboard.writeText(currentColor);
    alertBox.style.display = "flex"
    message.textContent = `${currentColor} copied to clipboard`
});

favBtn.addEventListener("click", function () {
  if (!currentColor) return;

  // Prevent duplicate colors
  if (favoriteColors.includes(currentColor)) {
    return;
  }

  favoriteColors.push(currentColor);

  localStorage.setItem(
    "favoriteColors",
    JSON.stringify(favoriteColors)
  );

  const option = document.createElement("option");
  option.textContent = currentColor;
  option.value = currentColor;

  favorites.appendChild(option);
});


okButton.addEventListener("click", function(){
    alertBox.style.display = "none"
})

clear.addEventListener("click", function(){
    localStorage.clear()
    location.reload();
})




defaultBtn.addEventListener("click", function () {
    if(!currentColor){
        return
    }else{
    localStorage.setItem("defaultColor", currentColor);
    }
});
const savedDefaultColor = localStorage.getItem("defaultColor");
if (savedDefaultColor) {
    body.style.backgroundColor = savedDefaultColor;
}