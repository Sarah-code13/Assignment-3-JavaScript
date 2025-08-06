const baseUrl = "https://api.spoonacular.com";
const api = "04d1b52789974969a4b74a06107f2a63";
const input = document.querySelector(".input");
const searchBtn = document.querySelector(".searchBtn");
const nutritionBox = document.querySelector(".nutritionBox");
const calories = document.querySelector(".calories");
const protein = document.querySelector(".protein");
const carbs = document.querySelector(".carbs");
const fat = document.querySelector(".fat");
const resultPara = document.createElement("p");
resultPara.className = "resultPara";
document.body.appendChild(resultPara);
const container = document.createElement("div");
document.body.appendChild(container);
container.className = "container"
searchBtn.addEventListener("click", () => {
const query = input.value.trim();
    if (!query) {
        resultPara.textContent = "Enter a food or recipe name";
        return;
    }

    resultPara.textContent = "API is in function";
    container.innerHTML = "";
    

    fetch(`${baseUrl}/recipes/complexSearch?query=${query}&number=1&apiKey=${api}`)
    .then(res => res.json())
    .then(data => {
        resultPara.textContent = "";
        if (!data.results) {
            resultPara.textContent = "No food found"
            return;
        }
        const item = data.results[0];
       
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
    nutritionBtn.textContent = "Show nutrition facts about the dish";
    nutritionBtn.addEventListener("click", () =>
    fetchNutritionfacts(item.id));

    container.appendChild(title);
    container.appendChild(image);
    container.appendChild(nutritionBtn);
}
function fetchNutritionfacts(itemId) {
    resultPara.textContent = "Retrieving nutrition facts from api";

    fetch(`${baseUrl}/recipes/${itemId}/nutritionWidget.json?apiKey=${api}`)
    .then(res =>
        res.json()
    ).then (data=> {
       resultPara.textContent = "";
       displayNutrition(data);
    })
}
function displayNutrition(data){
    calories.textContent = `Calories: ${data.calories} kcal`;
    protein.textContent = `Proteins: ${data.protein} grams`;
    carbs.textContent = `Carbohydrates: ${data.carbs} grams`;
    fat.textContent = `Fat: ${data.fat} grams`;
}