const accesskey = "6N3XqPgsMhNmL3iw-fGiEvDMpMBuFxh2Y-hGFuxkC8c";

const formEl = document.querySelector("form");
const inputEl = document.querySelector( "#search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const search_btn = document.querySelector("#search-button");

let inputData = "";
let page = 1;


async function searchimages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}
    &client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imagelink.appendChild(image);
        imageWrapper.appendChild(imagelink);
        searchResults.appendChild(imageWrapper);
    });

    page++
    if(page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchimages();
});

showMore.addEventListener("click", () =>{
    searchimages();
});

search_btn.onclick = function(){
    this.innerHTML = "<div class='loader'></div>";
    setTimeout(() => {
        this.innerHTML = "Search";
    }, 2000);
}

