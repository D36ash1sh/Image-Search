const api_key="yXwvW9PgrRVQh1s9bM2iM2oC58kAXea-DRUA96BlPTs";


const searchForm = document.getElementById('search_form');
const searchBtn = document.getElementById('search-btn');
const searchResult= document.querySelector ('.searchResult');
const showMoreBtn = document.getElementById('ShowMoreBtn');
const searchInput = document.getElementById('SearchBox');
const loadingText = document.getElementById('loadingText');
const imageText = document.querySelector('.headerText');

let keyword = "";
let page = 1;

async function SearchImage() {
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${api_key}&per_page=12`;

    loadingText.style.display ="block";

    const response = await fetch(url)
    const data = await response.json();

    const results = data.results;
    //clear old search
    if (page === 1 ) {
    searchResult.innerHTML = "";
    }
    
    results.map((result)=>{
        const image =document.createElement('img');
        
        image.src = result.urls.small;

        image.className="w-[100%] h-[230px] object-cover rounded-md hover:scale-110 transition-transform duration-300 shadow-md "

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.className = "block overflow-hidden";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink)
    })
    if(data.total_pages > page){
        showMoreBtn.style.display = "block";
    }else{
        showMoreBtn.style.display = "none";
    }
    loadingText.style.display ="none"
}
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    page = 1;
    SearchImage();
})

showMoreBtn.addEventListener("click",()=>{
 page++;
 SearchImage()
})

imageText.addEventListener('click',()=>{
        searchInput.value = ""
        searchInput.placeholder = "Search any image ...";
        searchInput.focus();
        searchResult.innerHTML = "";
        loadingText.style.display ="none";
        showMoreBtn.style.display ="none";
    })