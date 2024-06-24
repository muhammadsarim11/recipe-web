var searchbtn = document.querySelector('.searchbtn');
var searchbar = document.querySelector('.searchbar');
var recipecontainer = document.querySelector(".recipe-container");
var recipeDetailContent = document.querySelector(".recipe-detail-content")
var recipeClose = document.querySelector(".recipe-close-btn")

const fetchRecipe = async (query) =>{
recipecontainer.innerHTML="<h1>Searching recipes...<h1>"


    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    )

const response = await data.json();

recipecontainer.innerHTML=""
response.meals.forEach(meal => {
    console.log(meal)
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe')

    recipeDiv.innerHTML = `
    <img src= "${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea} Dish</p>
    <p>${meal.strCategory}</p>
    `
const button = document.createElement('button')
button.textContent = "View Recipe"
recipeDiv.appendChild(button)

// adding event listener to button
button.addEventListener('click',()=>{
    openRecipe(meal);
})


    recipecontainer.appendChild(recipeDiv)
});

}
// function for fetching ingrediants
const fetchingIngredients =(meal) =>{
    let ingredientslist = "";
    for(let i=1; i<20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingredient}</li>`

        }
else{
    break
}
 
}
return ingredientslist; 
    
}

const openRecipe =(meal) =>{
    recipeDetailContent.innerHTML=`<h2 class="recipe-name">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class ="list-ingredients">${fetchingIngredients(meal)}</ul>
<div>
   <br> <h3>Instructions:</h3>
    <p class="recipe-instruction" >${meal.strInstructions}</p>
</div>
    `
    recipeDetailContent.parentElement.style.display ="block"
}

recipeClose.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display ="none"

})

searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchbar.value.trim();
    fetchRecipe(searchInput);

   
})