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

// ---- PROMPT - användaren ändrar h2:an --------------
let userCity = prompt("Vilken stad?");

// 1. FOR-LOOP - för att loopa igenom alla city namn. ------------------
for (let i = 0; i<cities.length; i++) {               // deklarerar en for-loop. Här skapas variablen i som startar på siffran (AKA index) 0. Vi skriver  i<cities.length  för att kunna loopa igenom varje objekt i arrayen från index 0 till sista objektet (genom att skriva cities.length kommer vi igenom alla och avslutar på sista objektet). Efter varje loop inkremeras i med 1 och går vidare till nästa index i arrayen.
createCityButton(cities[i].name)                      // anropar funktionen "createCityButton" med argumentet  (cities[i].name)  AKA indexet av det objektet vi är på. name för att kunna skriva ut värdet som står på name AKA stadens namn.
}

// MÅSTE HÄNDA EFTER ATT ALLA BOXAR SKAPATS I LOOPEN OVAN!!
const cityBoxes =  document.querySelectorAll(".cityBox");    // deklarerar konstanten cityBox som är divarna som städerna ligger i.


// --------------------------------
/* DETTA SKA HÄNDA...

OM STADEN FINNS I DATABASEN =
-    H2 uppdateras med stad + (land)
- H3 uppdateras med staden som ligger närmst (#closest) och längst bort (#furthest)
-    div (#cityBox) som innehåller staden som anv har skrivit in ska få svart bakgrundsfärg och vit textfärg (dessa finns i CSS)
- div (#cityBox) som innehåller staden som ligger närmst användarens stad får grön bakgrundsfärg och vit textfärg (finns i css) och texten i diven uppdateras till "... ligger ... mil bort"
- div (#cityBox) som innehåller staden som ligger längst bort från användarens stad får blå bakgrundsfärg och vit textfärg (finns i css) och texten i diven uppdateras till "... ligger ... mil bort"
-     title anger staden

OM STADEN INTE FINNS =
-     H2 uppdateras med staden anv skrivt in och "finns inte i databasen"
-     title anger "not found"
-     H3 försvinner - null
*/
// ---------------------------------

// ------- OM CITYFOUND = TRUE --------- //
let cityFound = false;     // VARFÖR FALSE?                           // variabeln "cityFound" håller koll på om vi hittar staden
selectedCity = null;

// Första loopen för att hitta den valda staden
for (let i = 0; i < cities.length; i++) {
    if (cities[i].name.toLowerCase() === userCity.toLowerCase()) {
        selectedCity = cities[i]; // Spara den valda staden som selectedCity
        cityFound = true; // Markera att staden hittades
        break; // Avsluta loopen när staden är funnen
    }
}

// Om staden inte hittas
if (!cityFound) {
    h2.textContent = `${userCity} finns inte i databasen`; // Visa att staden inte finns
    title.textContent = `Not Found`; // Uppdatera titeln till "Not Found"
    h3.textContent = null; // Ta bort texten för närmaste och längst bort
} 

if (cityFound) {
    h2.textContent = `${selectedCity.name} (${selectedCity.country})`; // Uppdatera h2 med stadens namn och land
    cityBoxes[cities.indexOf(selectedCity)].classList.add("target"); // Ändra bakgrund och textfärg för vald stad
    title.textContent = userCity; // Uppdatera titeln på sidan


    let minDistance = Infinity; // För att hitta närmaste stad
    let maxDistance = -Infinity; // För att hitta längst bort stad
    let closestCity = null; // tilldelar inget värde medvetet
    let furthestCity = null;

    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name.toLowerCase() !== userCity.toLowerCase()) {  
            let distanceValue = Infinity;

            // För att hitta avståndet utan att använda find()
            for (let j = 0; j < distances.length; j++) {
                if ((distances[j].city1 === selectedCity.id && distances[j].city2 === cities[i].id) || 
                    (distances[j].city2 === selectedCity.id && distances[j].city1 === cities[i].id)) {
                    distanceValue = distances[j].distance; // Om vi hittar matchande städer sätts avståndet
                    break; // När vi har hittat rätt avstånd, avbryt inre loopen
                }
            }

            // Om vi har hittat ett giltigt avstånd
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

    // Uppdatera H3 med information om närmaste och längst bort städer
    const closestSpan = document.querySelector("#closest");
    const furthestSpan = document.querySelector("#furthest");

    closestSpan.textContent = closestCity.name;  // Närmaste stad
    furthestSpan.textContent = furthestCity.name; 

    // Uppdatera text och färger i cityBoxes genom att använda index direkt
    for (let i = 0; i < cities.length; i++) {
        if (cities[i].name === closestCity.name) {
            cityBoxes[i].classList.add("closest");
            cityBoxes[i].textContent = `${closestCity.name} ligger ${minDistance / 10} mil bort`;
        } else if (cities[i].name === furthestCity.name) {
            cityBoxes[i].classList.add("furthest");
            cityBoxes[i].textContent = `${furthestCity.name} ligger ${maxDistance / 10} mil bort`;
        }
    }
}




//--------- TABELL ---------- //
function createTable() {
    const tabell = document.querySelector("#table")            // konstanten "tabell" som kopplas till diven #table som ska innehålla hela griden.
    const rows = cities.length; //???                                     // konstanten "rows" deklareras - kommer användas senare
    const columns = cities.length+ 1;                                        // konstanten "columns" deklareras - kommer användas senare
    
    //tabell.style.gridTemplateRows = "repeat(38, 1fr)";

// SKAPA KOLUMNERNA
    for (let a=0; a<columns; a++) {                             // for-loop med variablen "a", börjar på 0, kör till 40 (deklarerat i var "columns") och +1 efter varje loop.
        const emptyCell = document.createElement("div");        // loopen skapar en ny div (som får konstantnamnet "emptyCell") för varje loop/ iteration
        emptyCell.classList.add("cell");                        // divarna får klassen .cell som 
        emptyCell.classList.add("head_column");                 // divarna får klassen .head_column, AKA de 38 divarna som innehåller siffra 1-38 i översta raden (why column då??)
        tabell.appendChild(emptyCell);                          // de små emptyCell divarna appendas och blir barn till den stora diven som innehåller tabellen

        // LÄGG IN ID:S I ALLA ÖVRE KOLUMNBOXAR
        if (a === 0) {                                      // när a === 0
            emptyCell.textContent = "";                     // ska det inte finnas ngt textcontent i diven, eftersom den första ska vara tom
        } else {
            emptyCell.textContent = cities[a-1].id;         // index 1-38 på arrayen "cities".id skrivs ut i head columnen
        }
    }


// SKAPA RADERNA
    for (let i = 0; i < rows; i++) {                                // for-loop med variabel i som börjar på 0, kör så många divar som längden av arrayen cities och +1 efter varje loop.
        let namesRow = document.createElement("div");               // variablen "namesRow" blir divarna som skapas i loopen.
        namesRow.textContent = `${cities[i].id}-${cities[i].name}`; // alla divar som ligger först i alla rader till vänster (AKA den breda kolumnen till vänster) får textcontent "id + namn" i cities arrayen.
        namesRow.classList.add("head_row");                         // divarna får klassen .head_row som stylar dem genom CSS
        namesRow.classList.add("cell");                             // de får också klassen "cell"
        tabell.appendChild(namesRow);                               // divarna appendas som barn till den stora diven med tabellen


        if (i % 2 === 0) {                                    // ändrar så att varje jämn rad i kolumnen med namnen till vänster får en tjockare border
            namesRow.classList.add("even_row");
        }
      

        for (let j=0; j<cities.length; j++) {                        // for-loop med varibel j startar på 1, kör så många divar som längden på 
            const cell = document.createElement("div");              // konstanten "cell" blir de divar som skapas för varje loop
            cell.classList.add("cell");                              // divarna får klassen "cell"
            
            let distanceValue = null;                                           // variablen "distanceValue" får värdet null AKA inget for now
            for (let distance of distances) {                                   // for-loop som loopar genom de olika distanserna i arrayen distances
                if ((distance.city1 === cities[i].id && distance.city2 === cities[j].id)) {  
                // distance är objekten i arrayen distances, city 1 är nyckeln i objektet. om det objektet vi är på i arrayen är samma som objektet med indexet vi är på i i-loopen med nyckeln id OCH distance.city2 AKA om id:t på city2 är samma så..
                    distanceValue = distance.distance;     // ändras variablen distanceValue till det objektet vi är på eftersom distance variablen är som indexet (objektet) vi är på + nycklen distance som har värdet av distansen mellan de 2 städerna.
                    break;  // vi brekar - hoppar över if:en och vidare ner till nästa if som ligger i vår stora i-for-loop.
                }
                if (distance.city2 === cities[i].id && distance.city1 === cities[j].id) {  // 
                    distanceValue = distance.distance;  //
                }
            }

            if (distanceValue !== null) {               // här fortsätter vi efter distanceValue fått ett distans-värde AKA distanceValue är INTE null längre, då ska...
                cell.textContent = distanceValue / 10;  // cellen fyllas med distans-värdet / 10, annars en nolla för mkt
            } else if (i === j) {                       // annars om i===j 
                cell.textContent = "";                  // ska cellen vara tom
            }

            if (j % 2 === 0) {                                  // ändrar bakgrundsfäregen på varje jämn kolumn (i cell tabellen)
                cell.classList.add("even_col"); 
            }
            if (i % 2 === 0) {                                   // ändrar så att varje jämn rad i cell tabellen får en tjockare border
                cell.classList.add("even_row");
            }

            tabell.appendChild(cell);                           // divarna appendas som barn till tabell-diven
        }
    }
}


createTable();




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


