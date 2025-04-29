// const category = document.getElementById("category-filter");
// const country_code = "in";
// const BASE_URL = "https://saurav.tech/NewsAPI/";
// const everything_api = "<BASE_URL>/everything/<source_id>.json";

// async function fetcingFunction() {
//   const top_headlines_api = `${BASE_URL}/top-headlines/category/${category.value}/${country_code}.json`;

//   const response = await fetch(top_headlines_api);
//   const data = await response.json();
//   console.log("data : ", data);
// }

// category.addEventListener("change", fetcingFunction);

// const template = document.getElementById(""article)

/* js learning ===>>>> 

// array.slice(1); it will give a substring starting from index 1 to the end

// "use strict";


// When you assign a value to a variable without declaring it using var, let, or const, 
// JavaScript automatically creates a global variable (if not in strict mode).

// fetch("https://jsonplaceholder.typicode.com/posts/1")
// .then(response => response.body.getReader())  
// .then(reader => reader.read())  
// .then(({ done, value }) => console.log(value));  // Logs raw binary data (Uint8Array)
// value logs => Uint8Array(87) [123,  34,  117, 115, 101, 114,  73, 100, ...]



*/

console.log("js started");
const template = document.getElementById("article-template");
const categoryFilter = document.getElementById("category-filter");
// const articleFragment = template.content.cloneNode(true);
// console.log("fragment : ", articleFragment);
const searchtag = document.getElementById("search");
let articlesArray;

const country_code = "in";
// const category = "general";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

categories.map((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  categoryFilter.append(option);
});

const BASE_URL = "https://saurav.tech/NewsAPI/";
const everything_api = "<BASE_URL>/everything/<source_id>.json";

async function fetchingFunction(category) {
  try {
    const top_headlines_api = `${BASE_URL}/top-headlines/category/${category}/${country_code}.json`;
    const response = await fetch(top_headlines_api);
    console.log("response : ", response);
    if (!response.ok) {
      throw new Error("throw new error");
    }
    const data = await response.json();
    articlesArray = data.articles;
    console.log("articles Array : ", articlesArray);
    showArticles(articlesArray);
  } catch (err) {
    console.error(
      err ?? "News are not available currently, please try again later!"
    );
  }
}
fetchingFunction(categories[0]);
categoryFilter.addEventListener("change", (e) => {
  fetchingFunction(e.target.value);
  console.log("new category value : ", e.target.value);
});

searchtag.addEventListener("input", (e) => {
  e.preventDefault();
  // searchtag.value = e.target.value;
  //   this is happening automatically
  //   console.log("searched value : ", searchtag.value);
  showArticles(
    articlesArray.filter((data) =>
      data.title.toLowerCase().includes(searchtag.value.toLowerCase())
    )
  );
});

const newsArticles = document.getElementById("news-articles");
function showArticles(articlesArray) {
  newsArticles.innerHTML = "";
  articlesArray.map((data) => {
    // const article = articleFragment.querySelector("article");
    // this is not working when I am using articleFragment and by getting article tag inside article
    const article = template.content.cloneNode(true);
    article.querySelector(".source").textContent = data.source.name ?? "source";
    article.querySelector(".image").src = data.urlToImage;
    article.querySelector(".image").alt = "Image NA";
    article.querySelector(".title").textContent = data.title ?? "Title NA";
    article.querySelector(".author").textContent = data.author ?? "Author NA";
    article.querySelector(".date").textContent =
      new Date(data.publishedAt).toLocaleString() ?? "Date NA";
    article.querySelector(".description").textContent =
      data.description ?? "Description NA";
    article.querySelector(".websiteURL").href = data.url ?? "Link NA";
    newsArticles.append(article);
  });
}

function handleSearch() {}
