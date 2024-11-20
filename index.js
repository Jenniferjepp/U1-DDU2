// Recommended: All functions declared here ---------------------------------------

// 1. FUNKTION - skapa city-divar.
function createCityButton(cityName) {                // deklarerar funktionen "createCityButton" med parametern "cityName" (eftersom att denna kommer att ändras för varje stads namn).
    const newBox = document.createElement("div");    // skapar en ny div som tilldelas konstanten "newBox".
    newBox.classList.add("cityBox");                 // lägger till diven (AKA konstanten "newBox") i klassen "cityBox" som redan fanns deklarerad i CSS.
    newBox.textContent = cityName;                   // lägger till textcontent som finns i "cityName" (parametern) i diven.

    bigCityDiv.append(newBox);                       // appendar den nyskapta diven i den stora diven som redan fanns i HTML-dokumentet som ska innehålla alla city Buttons.
    return newBox;
}



// Recommended: constants with references to existing HTML-elements -----------------

const bigCityDiv = document.querySelector("#cities");      // deklarerar konstanten bigCityDiv som refererar till diven som har id:et #cities.
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const title = document.querySelector("title");             // deklarerar konstanten "title" som refererar till title elementet i head i HTML-dokumentet.

// Recommended: Ask for the city name and then the rest of the code -----------------

// 1. FOR-LOOP - för att loopa igenom alla city namn.
for (let i = 0; i<cities.length; i++) {               // deklarerar en for-loop. Här skapas variablen i som startar på siffran (AKA index) 0. Vi skriver  i<cities.length  för att kunna loopa igenom varje objekt i arrayen från index 0 till sista objektet (genom att skriva cities.length kommer vi igenom alla och avslutar på sista objektet). Efter varje loop inkremeras i med 1 och går vidare till nästa index i arrayen.
createCityButton(cities[i].name)                      // anropar funktionen "createCityButton" med argumentet  (cities[i].name)  AKA indexet av det objektet vi är på. name för att kunna skriva ut värdet som står på name AKA stadens namn.
}

// MÅSTE HÄNDA EFTER ATT ALLA BOXAR SKAPATS I LOOPEN OVAN!!
const cityBoxes =  document.querySelectorAll(".cityBox");    // deklarerar konstanten cityBox som är divarna som städerna ligger i.



// PROMPT - användaren ändrar h2:an
let userCity = prompt("Vilken stad?");


/* DETTA SKA HÄNDA...

OM STADEN FINNS I DATABASEN =
- H2 uppdateras med stad + (land)
- H3 uppdateras med staden som ligger närmst (#closest) och längst bort (#furthest)
- div (#cityBox) som innehåller staden som anv har skrivit in ska få svart bakgrundsfärg och vit textfärg (dessa finns i CSS)
- div (#cityBox) som innehåller staden som ligger närmst användarens stad får grön bakgrundsfärg och vit textfärg (finns i css) och texten i diven uppdateras till "... ligger ... mil bort"
- div (#cityBox) som innehåller staden som ligger längst bort från användarens stad får blå bakgrundsfärg och vit textfärg (finns i css) och texten i diven uppdateras till "... ligger ... mil bort"
- title anger staden

OM STADEN INTE FINNS =
- H2 uppdateras med staden anv skrivt in och "finns inte i databasen"
- title anger "not found"
- H3 försvinner - null
*/


let cityFound = false;     // VARFÖR FALSE?                           // variabeln "cityFound" håller koll på om vi hittar staden

for (let i = 0; i<cities.length; i++) {                               // skapar for-loop som loopar igenom alla städer i arrayen.
    if (cities[i].name.toLowerCase() === userCity.toLowerCase()) {    // om staden med indexet som loopen är på är strikt lika med användarens stad ska..
        h2.textContent = `${cities[i].name} (${cities[i].country})`;  // staden med indexet som loopen är på + landet med samma index skrivs ut i h2
        cityBoxes[i].classList.add("target");                         // ändrar backgrundsfärgen till svart och textfärgen till vit på den stadsbox som användaren valt.
        
        title.textContent = userCity;                                 // ändra titeln till namnet på staden som användaren valt.
        
        cityFound = true;                                             // då ändras variablen "cityFound" till true om vi hittar staden i arrayen
        break;                                                        // avslutar loopen eftersom vi hittat rätt stad
    }
}

if (!cityFound) {                                                     // om cityFound är false...      jämför om användarens stad är samma som falskt
    h2.textContent = `${userCity} finns inte i databasen`             // ändras h2 till staden användaren skriver in + finns inte i databasen
    title.textContent = `Not Found`;                                  // ändra titel till "Not Found"
    h3.textContent = null;
}

/* IF-SATS - ändra titel tagg
const title = document.querySelector("title");                         // deklarerar konstanten "title" som refererar till title elementet i head i HTML-dokumentet.
if (cityFound) {                                                       // om cityFound är true..
    title.textContent = userCity;                                      // ändra titeln till namnet på staden som användaren valt.
    
} else {                                                               // annars.. AKA cityFound är false
    title.textContent = `Not Found`;                                   // ändra titel till "Not Found"
} */


/*
// PROMPT - användaren ändrar h2:an
let userCity = prompt("Vilken stad?");
const h2 = document.querySelector("h2");
const cityBox =  document.querySelectorAll(".cityBox");              // deklarerar konstanten cityBox som är divarna som städerna ligger i.

// om stad finns i databas = h2 --> stad + (land)
// om stad ej finns i databas = h2 --> stad finns inte i databasen

let cityFound = false;     // VARFÖR FALSE?                                  // variabeln "cityFound" håller koll på om vi hittar staden

for (let i = 0; i<cities.length; i++) {                               // skapar for-loop som loopar igenom alla städer i arrayen.
    if (cities[i].name.toLowerCase() === userCity.toLowerCase()) {    // om staden med indexet som loopen är på är strikt lika med användarens stad ska..
        h2.textContent = `${cities[i].name} (${cities[i].country})`;  // staden med indexet som loopen är på + landet med samma index skrivs ut i h2
        
  
        // DENNA FINNS CSS      cityBox[i].style.backgroundColor = "black";                   // ändrar backgrundsfärgen till svart på den stadsbox som användaren valt.
   // DENNA MED     cityBox[i].style.color = "white";                             // ändrar färgen till vit på stadsboxen som användaren har valt.
        cityFound = true;                                             // då ändras variablen "cityFound" till true om vi hittar staden i arrayen
        break;                                                        // avslutar loopen eftersom vi hittat rätt stad
    }
}

if (!cityFound) {                                                     // om cityFound är false...      jämför om användarens stad är samma som falskt
    h2.textContent = `${userCity} finns inte i databasen`             // ändras h2 till staden användaren skriver in + finns inte i databasen
}

// IF-SATS - ändra titel tagg
const title = document.querySelector("title");                         // deklarerar konstanten "title" som refererar till title elementet i head i HTML-dokumentet.
if (cityFound) {                                                       // om cityFound är true..
    title.textContent = userCity;                                      // ändra titeln till namnet på staden som användaren valt.
    
} else {                                                               // annars.. AKA cityFound är false
    title.textContent = `Not Found`;                                   // ändra titel till "Not Found"
}
*/

/*
let closestCity = null;                                   // tilldelar inget värde medvetet
    let furthestCity = null;                                  // tilldelar inget värde medvetet
    let minDistance = distances.length;                       // tilldelar värdet av längden på arrayen
    let maxDistance = 0; 




let cityFound = false;     // VARFÖR FALSE?                                  // variabeln "cityFound" håller koll på om vi hittar staden

for (let i = 0; i<cities.length; i++) {                               // skapar for-loop som loopar igenom alla städer i arrayen.
    if (cities[i].name.toLowerCase() === userCity.toLowerCase()) {    // om staden med indexet som loopen är på är strikt lika med användarens stad ska..
        h2.textContent = `${cities[i].name} (${cities[i].country})`;  // staden med indexet som loopen är på + landet med samma index skrivs ut i h2
        
  
        // DENNA FINNS CSS      cityBox[i].style.backgroundColor = "black";                   // ändrar backgrundsfärgen till svart på den stadsbox som användaren valt.
   // DENNA MED     cityBox[i].style.color = "white";                             // ändrar färgen till vit på stadsboxen som användaren har valt.
        cityFound = true;                                             // då ändras variablen "cityFound" till true om vi hittar staden i arrayen
        break;                                                        // avslutar loopen eftersom vi hittat rätt stad
    }
}




//
if (userCity) {
   // h2.textContent = `${userCity.name} (${userCity.country})`;

    let closestCity = null;                                   // tilldelar inget värde medvetet
    let furthestCity = null;                                  // tilldelar inget värde medvetet
    let minDistance = Infinity;                       // tilldelar värdet av längden på arrayen
    let maxDistance = 0;   

    for (let path of distances) {
        if (path.city1 == userCity.id) {
            if (path.distance < minDistance) {
                minDistance = path.distance;
                closestCity = path.city2;
            }
            if (path.distance > maxDistance) {
                maxDistance = path.distance;
                furthestCity = path.city2;
            }
        }
    }

    let closestCityObject = cities.find(city => city.id == closestCity); // Hitta stad baserat på ID
    let furthestCityObject = cities.find(city => city.id == furthestCity);

   /* let closestCityObject = null;
    let furthestCityObject = null; 
    for (let city of cities) {
        if (city.id == closestCity) {
            closestCityObject = city;
        }
        if (city.id == furthestCity) {
            furthestCityObject = city;
        }
    }

    document.querySelector("h3").textContent = `Närmast: ${closestCityObject.name}, längst: ${furthestCityObject.name}`;
}
//} else {
   // document.querySelector
//}



/*
let maxDistance = 0;
let furthestCityIndex = -1;

for (let i = 0; i<distances.length; i++) {
    if (userCity === cities[distances[i].city1].name || userCity === cities[distances[i].city2].name) {
        let furthestCity = (userCity === cities[distances[i].city].name) ? distances[i].city2 : distances[i].city1;
        if (distances[i].distance > maxDistance); {
            maxDistance = distances[i].distance;
            furthestCityIndex = furthestCity;
        }
    }
}

if (furthestCityIndex !== -1) {
    const cityDivs = document.querySelectorAll(".cityBox");
    cityDivs[furthestCityIndex].classList.add("furthest");
}
*/

// NÄRMSTA OCH LÄNGST BORT
/*
function findClosestAndFurthestCity(userCityIndex) {
    let closestCity = null;                                   // tilldelar inget värde medvetet
    let furthestCity = null;                                  // tilldelar inget värde medvetet
    let minDistance = distances.length;                       // tilldelar värdet av längden på arrayen
    let maxDistance = 0;                                      // börjar på 0

    for (const distanceObj of distances) {                    // går igenom alla objekt i arrayen distances
        const city1 = distanceObj.city1;
        const city2 = distanceObj.city2;
        const distance = distanceObj.distance;
    } 
}
*/






/* MED FUNKTION??
function whatCity (cityName) {
    for (let i = 0; i<cities.length; i++) {
    return `${cities[i].name} (${cities[i].country})`;
    }
 }
    return `${cityName} finns inte i databasen`;
}
h2.textContent = whatCity(userCity);
*/


