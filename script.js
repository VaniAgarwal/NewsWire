const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const api_Key = "d3e433b82b9e4da2963c34ccf4465625";
const url = `${proxyUrl}https://newsapi.org/v2/everything?q=`;


window.addEventListener('load', ()=>fetchNews("India"));
function reload(){
    window.location.reload();  //when we click on logo home page reloaded
}
async function fetchNews(query){

    const res = await fetch(`${url}${query}&apiKey=${api_Key}`); //fetch function returns a promise so we will use await.
    const data = await res.json();  //will return a promise
    console.log(data);

    bindData(data.articles); //bind the data through this
}

function bindData(articles){

    const cardsContainer = document.getElementById('cards-container');
    const cardTemplate = document.getElementById('card-template');

    cardsContainer.innerHTML = '';

    articles.forEach((article)=>{
        if(!article.urlToImage) return; //for image

        const cardClone = cardTemplate.content.cloneNode(true);
        filleDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function filleDataInCard(cardClone,article){
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    const newsImg = cardClone.querySelector('#news-img');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(article.url, "_blank");
    });


}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav?.classList.add('active');

}

const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query)return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;

});


