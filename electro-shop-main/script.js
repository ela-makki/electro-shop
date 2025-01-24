// Exemple de données d'articles (vous pouvez remplacer ceci par une récupération réelle des données depuis une API)
const articles = [
    { id: 1, name: 'Bear Mini Fridges', category: 'fridge', price: 499, date: '2023-09-30', popularity: 10, imageSrc: 'fr.jfif' },
    { id: 11, name: 'Duck Mini Fridges', category: 'fridge', price: 499, date: '2023-09-30', popularity: 9, imageSrc: 'fr2.jfif' },
    { id: 111, name: 'Pastle pink Fridges', category: 'fridge', price: 1450, date: '2023-09-30', popularity: 7, imageSrc: 'frp.jfif' },
    { id: 1111, name: 'Sage green Fridges', category: 'fridge', price: 1220, date: '2023-09-30', popularity: 3, imageSrc: 'frg.jfif' },
    { id: 2, name: 'Pink oven', category: 'oven', price: 280, date: '2023-09-29', popularity: 4,imageSrc: 'ovenp.jfif'  },
    { id: 2, name: 'Green oven', category: 'oven', price: 370, date: '2023-09-29', popularity: 4,imageSrc: 'oveng.jpg'  },
    { id: 2, name: 'Yellow oven', category: 'oven', price: 793, date: '2023-09-29', popularity: 4,imageSrc: 'oveny.jfif'  },
    { id: 3, name: 'Mini purple Washer', category: 'washer', price: 399, date: '2023-09-28', popularity: 3,imageSrc: 'washm.jfif'  },
    { id: 3, name: 'Mini  Washer', category: 'washer', price: 325, date: '2023-09-28', popularity: 3,imageSrc: 'wash.jfif'  },
    { id: 3, name: 'Beauty blinder Mini Washer', category: 'washer', price: 35, date: '2023-09-28', popularity: 3,imageSrc: 'washb.jfif'  },
];

const articlesPerPage = 3;
let currentPage = 1;

function displayArticles(articlesToShow) {
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const currentArticles = articlesToShow.slice(startIndex, endIndex);

    currentArticles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('article-card');
        articleCard.innerHTML = `
            <img src="${article.imageSrc}" alt="${article.name}">
            <h3>${article.name}</h3>
            <p>Prix: ${article.price} DTN</p>
            <button onclick="addToCart(${article.id})">Ajouter au Panier</button>
            <button onclick="addToFavorites(${article.id})">Ajouter aux Favoris <3 </button>
        `;
        articleList.appendChild(articleCard);
    });

    displayPagination(articlesToShow.length);
}

function displayPagination(totalArticles) {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
  
    const prevButton = document.createElement('button');
    prevButton.className = 'btn1';
    prevButton.innerHTML = '<img src="arrow.png">Prev';
    prevButton.onclick = function () {
      changePage(currentPage - 1);
    };
    pagination.appendChild(prevButton);
  
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('li');
      pageLink.textContent = i;
      pageLink.onclick = function () {
        changePage(i);
      };
  
      if (i === currentPage) {
        pageLink.classList.add('active');
      }
  
      pagination.appendChild(pageLink);
    }
  
    const nextButton = document.createElement('button');
    nextButton.className = 'btn2';
    nextButton.innerHTML = 'Next<img src="arrow.png">';
    nextButton.onclick = function () {
      changePage(currentPage + 1);
    };
    pagination.appendChild(nextButton);
  }
function changePage(pageNumber) {
    currentPage = pageNumber;
    displayArticles(articles);
}

function sortArticles() {
    const sortBy = document.getElementById('sort').value;
    const sortOrder = document.getElementById('sort-order').value;

    articles.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (sortOrder === 'asc') {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        } else {
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
        }

        return 0;
    });

    displayArticles(articles);
}

function filterArticles() {
    const selectedTags = Array.from(document.querySelectorAll('#tags option:checked')).map(option => option.value);

    if (selectedTags.length === 0) {
        displayArticles(articles);
    } else {
        const filteredArticles = articles.filter(article => selectedTags.includes(article.category));
        displayArticles(filteredArticles);
    }
}

function search() {
    const keyword = document.getElementById('search').value.toLowerCase();
    const searchResults = articles.filter(article => article.name.toLowerCase().includes(keyword));
    displayArticles(searchResults);
}

function addToCart(articleId) {
    console.log(`Ajouter au panier : ${articleId}`);
}

function addToFavorites(articleId) {
    console.log(`Ajouter aux favoris : ${articleId}`);
}

function init() {
    displayArticles(articles);
}

init();