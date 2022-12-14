import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [isFood, setIsFood] = useState(false);
  const [isDrink, setIsDrink] = useState(false);
  const [foodsRecipes, setFoodRecipes] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [email, setEmail] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [recipeFromCategory, setRecipeCategory] = useState([]);
  const [toggleCategory, setToggleCategory] = useState([]);
  const [All, setAll] = useState(true);
  const [withCategory, setWithCategory] = useState(false);
  const TWELVE = 12;
  const FIVE = 5;

  useEffect(() => {
    const FetchFoodsRecipes = async () => {
      const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await fetchApi.json();
      if (result) {
        const firstsResults = result.meals.filter((_item, idx) => idx < TWELVE);
        setFoodRecipes(firstsResults);
      }
    };

    const FetchFoodsCategory = async () => {
      const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const result = await fetchApi.json();
      if (result) {
        const firstsResults = result.meals.filter((_item, idx) => idx < FIVE);
        setFoodCategories(firstsResults);
      }
    };

    const FetchDrinksRecipes = async () => {
      const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const results = await fetchApi.json();
      if (results) {
        const firstsResults = results.drinks.filter((_item, idx) => idx < TWELVE);
        setDrinkRecipes(firstsResults);
      }
    };

    const FetchDrinksCategories = async () => {
      const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const results = await fetchApi.json();
      if (results) {
        const firstsResults = results.drinks.filter((_item, idx) => idx < FIVE);
        setDrinkCategories(firstsResults);
      }
    };

    FetchFoodsRecipes();
    FetchFoodsCategory();
    FetchDrinksRecipes();
    FetchDrinksCategories();
  }, []);

  const fetchFoodsFromCategory = async (category) => {
    let URL = '';
    const foodArray = foodCategories.map((item) => item.strCategory);
    if (foodArray.includes(category)) {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    } else {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    const fetchApi = await fetch(URL);
    const result = await fetchApi.json();
    setRecipeCategory(result);
  };

  const results = async (url, page) => {
    if (page === '/foods') {
      try {
        const fetchApi = await fetch(url);
        const result = await fetchApi.json();
        const firstsResults = result.meals.filter((_item, idx) => idx < TWELVE);
        setFoodRecipes(firstsResults);
      } catch {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
    if (page === '/drinks') {
      try {
        const fetchApi = await fetch(url);
        const result = await fetchApi.json();
        const firstsResults = result.drinks.filter((_item, idx) => idx < TWELVE);
        setDrinkRecipes(firstsResults);
      } catch {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    }
  };

  const fetchFoodsOrDrinksRecipesFilter = async (searchRadio, searchText, page) => {
    let urlIngredient = '';
    let urlName = '';
    let urlFirstLetter = '';
    if (page === '/foods') {
      urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
      urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
      urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
    }
    if (page === '/drinks') {
      urlIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`;
      urlName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
      urlFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`;
    }
    if (searchRadio === 'ingredient') {
      results(urlIngredient, page);
    } else if (searchRadio === 'name') {
      results(urlName, page);
    } else if (searchRadio === 'firstLetter' && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      results(urlFirstLetter, page);
    }
  };

  const toggle = (name) => {
    toggleCategory.map((item) => {
      if (item.category !== name) {
        item.toggleCategory = false;
      } else if (item.category === name && item.toggleCategory === false) {
        setAll(false);
        setWithCategory(true);
        item.toggleCategory = true;
        return item;
      } else if (item.category === name && item.toggleCategory === true) {
        setAll(true);
        setWithCategory(false);
        item.toggleCategory = false;
        return item;
      }
      return toggleCategory;
    });
  };

  const context = {
    isFood,
    setIsFood,
    isDrink,
    setIsDrink,
    foodsRecipes,
    drinkRecipes,
    email,
    setEmail,
    foodCategories,
    drinkCategories,
    fetchFoodsFromCategory,
    recipeFromCategory,
    fetchFoodsOrDrinksRecipesFilter,
    toggle,
    toggleCategory,
    setToggleCategory,
    All,
    setAll,
    withCategory,
    setWithCategory,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
