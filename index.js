
function createCityButton(cityName) {                
    const cityBox = document.createElement("div");    
    cityBox.classList.add("cityBox");                 
    cityBox.textContent = cityName;                   
    bigCityDiv.append(cityBox);                       
}


function createTable() {
    const tabell = document.querySelector("#table");
    

    for (let a=0; a< cities.length+ 1; a++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("cell");
        emptyCell.classList.add("head_column");
        tabell.appendChild(emptyCell);

        if (a === 0) {
            emptyCell.textContent = "";
        } else {
            emptyCell.textContent = cities[a-1].id;
        }
    }


    for (let i = 0; i < cities.length; i++) {
        let namesRow = document.createElement("div");
        namesRow.textContent = `${cities[i].id}-${cities[i].name}`;
        namesRow.classList.add("head_row");
        namesRow.classList.add("cell");
        tabell.appendChild(namesRow);

        if (i % 2 === 0) {
            namesRow.classList.add("even_row");
        }
      

        for (let j=0; j<cities.length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            
            let distanceValue = null;
            for (let distance of distances) {
                if ((distance.city1 === cities[i].id && distance.city2 === cities[j].id)) {
                    distanceValue = distance.distance;
                    break;
                }
                if (distance.city2 === cities[i].id && distance.city1 === cities[j].id) {
                    distanceValue = distance.distance;
                }
            }

            if (distanceValue !== null) {
                cell.textContent = distanceValue / 10;
            } else if (i === j) {
                cell.textContent = "";
            }

            if (j % 2 === 0) {
                cell.classList.add("even_col"); 
            }
            if (i % 2 === 0) {
                cell.classList.add("even_row");
            }

            tabell.appendChild(cell);
        }
    }
}




const bigCityDiv = document.querySelector("#cities");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const title = document.querySelector("title");




let userCity = prompt("Vilken stad?");



for (let i = 0; i < cities.length; i++) {
createCityButton(cities[i].name)                      
}

const cityBox =  document.querySelectorAll(".cityBox");




let cityFound = false;
let selectedCity = null;                                              

for (let i = 0; i < cities.length; i++) {
    if (cities[i].name.toLowerCase() === userCity.toLowerCase()) {
        selectedCity = cities[i];
        cityFound = true;
        break;
    }
}


if (!cityFound) {
    h2.textContent = `${userCity} finns inte i databasen`;
    title.textContent = `Not Found`;
    h3.textContent = null;
} 

if (cityFound) {
    h2.textContent = `${selectedCity.name} (${selectedCity.country})`;
    title.textContent = userCity;
    cityBox[cities.indexOf(selectedCity)].classList.add("target");
           

    let minDistance = Infinity;
    let maxDistance = -Infinity;
    let closestCity = null;
    let furthestCity = null;

    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase() !== userCity.toLowerCase()) {
            let distanceValue = Infinity;

            
            for (let j = 0; j < distances.length; j++) {
                if (distances[j].city1 === selectedCity.id) {
                    if (distances[j].city2 === cities[i].id) {
                        distanceValue = distances[j].distance;
                        break;
                    }
                }
                if (distances[j].city2 === selectedCity.id) {
                    if (distances[j].city1 === cities[i].id) {
                        distanceValue = distances[j].distance;
                        break;
                    }
                }
            }


            if (distanceValue < minDistance) {
                minDistance = distanceValue;
                closestCity = cities[i];
            }

            if (distanceValue > maxDistance) {
                maxDistance = distanceValue;
                furthestCity = cities[i];
            }
        }
    }


    const closestSpan = document.querySelector("#closest");
    const furthestSpan = document.querySelector("#furthest");

    closestSpan.textContent = closestCity.name;
    furthestSpan.textContent = furthestCity.name; 

    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === closestCity.name) {
            cityBox[i].classList.add("closest");
            cityBox[i].textContent = `${closestCity.name} ligger ${minDistance / 10} mil bort`;
        } else if (cities[i].name === furthestCity.name) {
            cityBox[i].classList.add("furthest");
            cityBox[i].textContent = `${furthestCity.name} ligger ${maxDistance / 10} mil bort`;
        }
    }
}


createTable();


