import data from './Dropdowndata.js'


const navel = document.getElementById('nav');
const sl = document.createElement('select');
sl.setAttribute(`id`,`year`);
console.log(sl);

data.forEach(op =>{
    const option = document.createElement('option');
    option.textContent = op.text
    option.value = op.value

    if(op.selected){
        option.selected = op.selected
    }

   sl.appendChild(option);

})
navel.appendChild(sl);
const apikey = `512603a956b2aba0a6a52f5718934251`
const dropdown = document.getElementById('year');
const year = dropdown.value;

let page = 1  
const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&year=${year}&page=${page}`;

const content = document.getElementById("content");

const displayMovie = async (url) =>{
    const res = await fetch(url)
    const movie = await res.json();
    console.log(movie);
    const urlPoster =  `https://image.tmdb.org/t/p/w500/`;

    movie.results.forEach(M => {
        const linkto = document.createElement("a")
        linkto.href = `https://www.youtube.com/results?search_query=${M.title}fullmovie`
        const mvEL = document.createElement("div")
        const circle = document.createElement("div")
        circle.classList.add("reteContenter") 
        const title = document.createElement("h2")
        const rate = document.createElement("h4")
        rate.classList.add("rete_text")
        const poster = document.createElement("img")

        title.innerHTML = `${M.title.substring(0, 25)}`;
        poster.src = `${urlPoster}${M.poster_path}`;
        rate.innerHTML = `${M.vote_average}`;


        circle.appendChild(rate);
        mvEL.appendChild(circle);
        mvEL.appendChild(title);
        mvEL.appendChild(poster);
        linkto.appendChild(mvEL);
        content.appendChild(linkto);
    })

    dropdown.addEventListener('change',()=>{
        console.log(dropdown.value);
        let update_year = dropdown.value
        let update_url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&year=${update_year}&page=1`;
        content.innerHTML = "";
        displayMovie(update_url);
    })
}
const OnPageChange = (p)=>{
    page = p;
    const update_url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&year=${year}&page=${page}`;
    content.innerHTML = "";
    displayMovie(update_url);
}
    
const Showpage = () =>{
    const totalPage = 10;
    const pagination = document.getElementById("pagination")


    for (let i = 0 ; i < totalPage; i++){
        const pageContainer = document.createElement("div")
            pageContainer.classList.add("pageContainer")
        
        
            const pagelink =document.createElement("a")
            pagelink.textContent = i+1;
            pagelink.addEventListener("click",()=> OnPageChange(i +1 ));

             pageContainer.appendChild(pagelink);
             pagination.appendChild(pageContainer);

    }
}



displayMovie(url);
Showpage();
