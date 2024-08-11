const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnReset');

btnSearch.addEventListener('click', searchDestination)
btnClear.addEventListener('click', clearSearchResult)
document.getElementById('results').style.display = 'none';

function searchDestination(){ 
const inputSearch = document.getElementById('destinationSearch').value.toLowerCase().trim(); 
const destinations = document.getElementById('results'); 
destinations.innerHTML = ""; 

fetch('travel_recommendation_api.json') 
.then(response => response.json()) 
.then (data => { 
    document.getElementById('results').style.display = '';
let found = false 
data.countries.forEach(country => { 
country.cities.forEach(city => { 
if ( city.name.toLowerCase().includes(inputSearch) || country.name.toLowerCase().includes(inputSearch)){ 
destinations.innerHTML += ` 
<div> 
<img src="${city.imageUrl}" alt="${city.name}"> 
<h3>${city.name}</h3> 
<p>${city.description}</p> 
<button> Visit </button> </div>`; found = true; } }) })

data.temples.forEach(temple => { 
if ( temple.name.toLowerCase().includes(inputSearch)){ 
destinations.innerHTML += ` 
<div> 
<img src="${temple.imageUrl}" alt="${temple.name}"> 
<h3>${temple.name}</h3> 
<p> ${temple.description}</p> 
<button> Visit </button> 
</div>` 
found = true; 
} 
})

data.beaches.forEach(beach => { 
if ( beach.name.toLowerCase().includes(inputSearch)){ 
destinations.innerHTML += ` 
<div> 
<img src="${beach.imageUrl}" alt="${beach.name}"> 
<h3 >${beach.name}</h3> 
<p> ${beach.description}</p> 
<button> Visit </button> 
</div>` 
found = true; 
} 
})

if (!found){ 
destinations.innerHTML = "Destination not found."; 
}
}).catch (error => { 
console.error("Error fetching data:", error); 
destinations.innerHTML = 'error in fetching the data';
})
}

function clearSearchResult(){
    document.getElementById('destinationSearch').value = ""; 
    document.getElementById('results').style.display = 'none';
    document.getElementById('results').innerHTML = ""; 

}