const baseUrl = "https://api.spoonacular.com/";
const api = "04d1b52789974969a4b74a06107f2a63";
const input = document.querySelector(".input");
const searchBtn = document.querySelector(".searchBtn");

const resultPara = document.createElement("p");
document.appendChild(resultPara);
const container = document.createElement("div");
document.appendChild(container);
searchBtn.addEventListener("click", () => {
const query = input.value.trim();
    if (!query) {
        resultPara.textContent = "Enter a food or recipe name";
        return;
    }

    resultPara.textContent = "API is in function";
    container.innerHTML = "";

    fetch(`${baseUrl}/recipes/complexSearch?query=${query}&number=1&apikey=${api}`)
    .then(res => res.json())
    .then(data => {
        resultPara.textContent = "";
        if (!data.container.length) {
            resultPara.textContent = "No food found"
            return;
        }
        const item = data.container[0];
        displayRecipe(item);
    })
});
function displayRecipe(item) {
    container.innerHTML = "";
    const title = document.createElement("h2");
    title.textContent = item.title;
    const image = document.createElement("img");
    image.src = item.image;
    image.style.maxWidth = "400px";

    const nutritionBtn = document.createElement("button");
}