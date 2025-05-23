
        const faIcons = document.createElement('link');
        faIcons.rel = 'stylesheet';
        faIcons.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(faIcons);
        
  
        const recipes = [
            {
                id: 1,
                title: "Fluffy Pancakes",
                image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                time: "20 mins",
                rating: 4.7,
                ingredients: [
                    "1 cup all-purpose flour",
                    "2 tablespoons sugar",
                    "2 teaspoons baking powder",
                    "1/2 teaspoon salt",
                    "1 cup milk",
                    "1 large egg",
                    "2 tablespoons melted butter"
                ],
                instructions: [
                    "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
                    "In another bowl, beat the egg, then add milk and melted butter.",
                    "Pour wet ingredients into dry ingredients and stir until just combined.",
                    "Heat a lightly oiled griddle or frying pan over medium-high heat.",
                    "Pour the batter onto the griddle, using approximately 1/4 cup for each pancake.",
                    "Cook until bubbles form and the edges are dry, then flip and cook until browned on the other side."
                ]
            },
            {
                id: 2,
                title: "Classic Spaghetti Bolognese",
                image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                time: "45 mins",
                rating: 4.8,
                ingredients: [
                    "400g spaghetti",
                    "1 tablespoon olive oil",
                    "1 onion, finely chopped",
                    "2 garlic cloves, minced",
                    "500g ground beef",
                    "400g canned tomatoes",
                    "2 tablespoons tomato paste",
                    "1 teaspoon dried oregano",
                    "Salt and pepper to taste",
                    "Grated Parmesan cheese for serving"
                ],
                instructions: [
                    "Cook spaghetti according to package instructions.",
                    "Heat oil in a large pan over medium heat. Add onion and garlic, cook until soft.",
                    "Add ground beef and cook until browned.",
                    "Stir in tomatoes, tomato paste, and oregano. Simmer for 20 minutes.",
                    "Season with salt and pepper.",
                    "Serve sauce over cooked spaghetti with grated Parmesan."
                ]
            },
            {
                id: 3,
                title: "Chocolate Chip Cookies",
                image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                time: "30 mins",
                rating: 4.9,
                ingredients: [
                    "2 1/4 cups all-purpose flour",
                    "1 teaspoon baking soda",
                    "1 teaspoon salt",
                    "1 cup butter, softened",
                    "3/4 cup granulated sugar",
                    "3/4 cup packed brown sugar",
                    "2 large eggs",
                    "2 teaspoons vanilla extract",
                    "2 cups chocolate chips"
                ],
                instructions: [
                    "Preheat oven to 375°F (190°C).",
                    "Combine flour, baking soda and salt in small bowl.",
                    "Beat butter, granulated sugar, brown sugar and vanilla in large mixer bowl.",
                    "Add eggs one at a time, beating well after each addition.",
                    "Gradually beat in flour mixture.",
                    "Stir in chocolate chips.",
                    "Drop by rounded tablespoon onto ungreased baking sheets.",
                    "Bake for 9 to 11 minutes or until golden brown."
                ]
            }
            
        ];

        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        let currentRecipe = null;
        let darkMode = localStorage.getItem('darkMode') === 'true';
        

        const homePage = document.getElementById('homePage');
        const recipePage = document.getElementById('recipePage');
        const recipeBookPage = document.getElementById('recipeBookPage');
        const recipesContainer = document.getElementById('recipesContainer');
        const savedRecipesContainer = document.getElementById('savedRecipesContainer');
        const emptyRecipeBook = document.getElementById('emptyRecipeBook');
        

        document.addEventListener('DOMContentLoaded', () => {
            updateTheme();
            displayRecipes(recipes, 'recipesContainer');

            document.getElementById('homeBtn').addEventListener('click', showHomePage);
            document.getElementById('recipeBookBtn').addEventListener('click', showRecipeBookPage);
            document.getElementById('backBtn').addEventListener('click', showHomePage);
            document.getElementById('searchBtn').addEventListener('click', searchRecipes);
            document.getElementById('searchInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') searchRecipes();
            });
            document.getElementById('saveRecipeBtn').addEventListener('click', toggleSaveRecipe);
            document.getElementById('shareRecipeBtn').addEventListener('click', shareRecipe);
            document.getElementById('clearRecipesBtn').addEventListener('click', clearSavedRecipes);
            document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        });
        

        function showPage(pageId) {
            homePage.classList.add('hidden');
            recipePage.classList.add('hidden');
            recipeBookPage.classList.add('hidden');
            document.getElementById(pageId).classList.remove('hidden');
        }
        
        function showHomePage() {
            showPage('homePage');
            displayRecipes(recipes, 'recipesContainer');
        }
        
        function showRecipeBookPage() {
            showPage('recipeBookPage');
            displayRecipes(savedRecipes, 'savedRecipesContainer');
            
            if (savedRecipes.length === 0) {
                emptyRecipeBook.classList.remove('hidden');
                savedRecipesContainer.classList.add('hidden');
            } else {
                emptyRecipeBook.classList.add('hidden');
                savedRecipesContainer.classList.remove('hidden');
            }
        }

        function displayRecipes(recipesToShow, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            
            if (recipesToShow.length === 0) {
                container.innerHTML = '<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-utensils"></i></div><h3>No recipes found</h3><p>Try a different search term</p></div>';
                return;
            }
            
            recipesToShow.forEach(recipe => {
                const isSaved = savedRecipes.some(r => r.id === recipe.id);
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" class="recipe-image" alt="${recipe.title}">
                    <div class="recipe-content">
                        <h3 class="recipe-title">${recipe.title}</h3>
                        <div class="flex items-center gap-2 mt-1">
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <span>${recipe.rating}</span>
                            </div>
                            <span>•</span>
                            <div class="time">
                                <i class="fas fa-clock"></i>
                                <span>${recipe.time}</span>
                            </div>
                        </div>
                        <div class="recipe-actions">
                            <button onclick="showRecipe(${recipe.id})" class="btn btn-primary">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button onclick="toggleSave(${recipe.id})" class="btn ${isSaved ? '' : 'btn-primary'}">
                                <i class="fas fa-bookmark"></i> ${isSaved ? 'Saved' : 'Save'}
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(recipeCard);
            });
        }
        
        function showRecipe(id) {
            currentRecipe = recipes.find(r => r.id === id);
            if (!currentRecipe) currentRecipe = savedRecipes.find(r => r.id === id);
            
            document.getElementById('recipeTitle').textContent = currentRecipe.title;
            document.getElementById('recipeImage').src = currentRecipe.image;
            document.getElementById('recipeImage').alt = currentRecipe.title;
            document.getElementById('recipeTime').textContent = currentRecipe.time;
            document.getElementById('recipeRating').textContent = currentRecipe.rating;
            
            const ingredientsList = document.getElementById('ingredientsList');
            ingredientsList.innerHTML = currentRecipe.ingredients.map(ingredient => 
                `<li>${ingredient}</li>`
            ).join('');
            
            const instructionsList = document.getElementById('instructionsList');
            instructionsList.innerHTML = currentRecipe.instructions.map((instruction, index) => 
                `<li>${instruction}</li>`
            ).join('');
            
            const isSaved = savedRecipes.some(r => r.id === id);
            document.getElementById('saveRecipeBtn').innerHTML = `
                <i class="fas fa-bookmark"></i> ${isSaved ? 'Remove' : 'Save'}
            `;
            
            showPage('recipePage');
        }
        document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'NJNhoXzZnLmFPVZnA2FbcvEBzPEcKTbEe6aMpzMF';
    const apiUrl = `https://https://fdc.nal.usda.gov/food-search=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function displayData(data) {
    const title = document.getElementById('title');
    const description = document.getElementById('description');


    title.textContent = data.title || 'No Title';
    description.textContent = data.description || 'No Description';
}
        

        function toggleSaveRecipe() {
            if (!currentRecipe) return;
            toggleSave(currentRecipe.id);
        }
        
        function toggleSave(id) {
            const recipe = recipes.find(r => r.id === id);
            const index = savedRecipes.findIndex(r => r.id === id);
            
            if (index === -1) {
                savedRecipes.push(recipe);
                showToast('Recipe saved to your book!');
            } else {
                savedRecipes.splice(index, 1);
                showToast('Recipe removed from your book');
            }
            
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            

            if (recipePage.classList.contains('hidden')) {
                displayRecipes(recipes, 'recipesContainer');
            } else {
                document.getElementById('saveRecipeBtn').innerHTML = `
                    <i class="fas fa-bookmark"></i> ${index === -1 ? 'Remove' : 'Save'}
                `;
            }
            
            if (!recipeBookPage.classList.contains('hidden')) {
                displayRecipes(savedRecipes, 'savedRecipesContainer');
                if (savedRecipes.length === 0) {
                    emptyRecipeBook.classList.remove('hidden');
                    savedRecipesContainer.classList.add('hidden');
                }
            }
        }
        
        function clearSavedRecipes() {
            if (savedRecipes.length === 0) return;
            
            if (confirm('Are you sure you want to clear all saved recipes?')) {
                savedRecipes = [];
                localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                displayRecipes(savedRecipes, 'savedRecipesContainer');
                emptyRecipeBook.classList.remove('hidden');
                savedRecipesContainer.classList.add('hidden');
                showToast('All recipes cleared');
            }
        }
        
 
        function searchRecipes() {
            const term = document.getElementById('searchInput').value.toLowerCase();
            if (!term.trim()) {
                displayRecipes(recipes, 'recipesContainer');
                return;
            }
            
            const filtered = recipes.filter(r => 
                r.title.toLowerCase().includes(term) || 
                r.ingredients.some(i => i.toLowerCase().includes(term))
            );
            
            displayRecipes(filtered, 'recipesContainer');
        }

        function shareRecipe() {
            if (!currentRecipe) return;
            
            if (navigator.share) {
                navigator.share({
                    title: currentRecipe.title,
                    text: `Check out this delicious ${currentRecipe.title} recipe!`,
                    url: window.location.href
                }).catch(err => {
                    console.log('Error sharing:', err);
                    copyToClipboard();
                });
            } else {
                copyToClipboard();
            }
        }
        
        function copyToClipboard() {
            if (!currentRecipe) return;
            
            const recipeText = `${currentRecipe.title}\n\nIngredients:\n${currentRecipe.ingredients.join('\n')}\n\nInstructions:\n${currentRecipe.instructions.map((step, i) => `${i+1}. ${step}`).join('\n')}`;
            
            navigator.clipboard.writeText(recipeText).then(() => {
                showToast('Recipe copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
                showToast('Failed to copy recipe');
            });
        }

        function toggleTheme() {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            updateTheme();
        }
        
        function updateTheme() {
            if (darkMode) {
                document.body.classList.add('dark');
                document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i> Light';
            } else {
                document.body.classList.remove('dark');
                document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i> Dark';
            }
        }
        
 
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }
           let selectedMeal = null;

        async function searchMeals() {
            const keyword = document.getElementById('searchInput').value.trim();
            if (!keyword) {
                alert('Please enter a keyword.');
                return;
            }

            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status code: ${response.status}`);
                }

                const data = await response.json();
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = '';
                const recipeDetailsDiv = document.getElementById('recipeDetails');
                recipeDetailsDiv.innerHTML = '';

                if (data.meals && data.meals.length > 0) {
                    data.meals.forEach(meal => {
                        const mealDiv = document.createElement('div');
                        mealDiv.className = 'meal';
                        mealDiv.innerHTML = `
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <div class="meal-content">
                                <h3>${meal.strMeal}</h3>
                                <p>${meal.strInstructions.substring(0, 100)}...</p>
                            </div>
                        `;
                        mealDiv.onclick = () => viewRecipe(meal);
                        resultsDiv.appendChild(mealDiv);
                    });
                } else {
                    resultsDiv.innerHTML = `<p>No meals found for '${keyword}'.</p>`;
                }
            } catch (error) {
                alert(error.message);
            }
        }

        function viewRecipe(meal) {
            selectedMeal = meal;
            const recipeDetailsDiv = document.getElementById('recipeDetails');
            recipeDetailsDiv.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <div class="recipe-ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                      ${meal.strIngredient1 ? `<li>${meal.strIngredient1} - ${meal.strMeasure1}</li>` : ''}
                        ${meal.strIngredient2 ? `<li>${meal.strIngredient2} - ${meal.strMeasure2}</li>` : ''}
                        ${meal.strIngredient3 ? `<li>${meal.strIngredient3} - ${meal.strMeasure3}</li>` : ''}
                        ${meal.strIngredient4 ? `<li>${meal.strIngredient4} - ${meal.strMeasure4}</li>` : ''}
                        ${meal.strIngredient5 ? `<li>${meal.strIngredient5} - ${meal.strMeasure5}</li>` : ''}  
                    </ul>
                </div>
                <div class="recipe-instructions">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
            `;
        }
        
   
        window.showRecipe = showRecipe;
        window.toggleSave = toggleSave;