// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code



const bigCityDiv = document.querySelector("#cities"); // deklarerar konstanten bigCityDiv som refererar till diven som har id:et #cities.

// FUNKTION - skapa city-divar.
function createCityButton(cityName) {                // deklarerar funktionen "createCityButton" med parametern "cityName" (eftersom att denna kommer att ändras för varje stads namn).
    const newBox = document.createElement("div");    // skapar en ny div som tilldelas konstanten "newBox".
    newBox.classList.add("cityBox");                 // lägger till diven (AKA konstanten "newBox") i klassen "cityBox" som redan fanns deklarerad i CSS.
    newBox.textContent = cityName;                   // lägger till textcontent som finns i "cityName" (parametern) i diven.

    bigCityDiv.append(newBox);                       // appendar den nyskapta diven i den stora diven som redan fanns i HTML-dokumentet som ska innehålla alla city Buttons.
}

// FOR-LOOP - för att loopa igenom alla city namn.
for (let i = 0; i<cities.length; i++) {               // deklarerar en for-loop. Här skapas variablen i som startar på siffran (AKA index) 0. Vi skriver  i<cities.length  för att kunna loopa igenom varje objekt i arrayen från index 0 till sista objektet (genom att skriva cities.length kommer vi igenom alla och avslutar på sista objektet). Efter varje loop inkremeras i med 1 och går vidare till nästa index i arrayen.
createCityButton(cities[i].name)                      // anropar funktionen "createCityButton" med argumentet  (cities[i].name)  AKA indexet av det objektet vi är på. name för att kunna skriva ut värdet som står på name AKA stadens namn.
}




// PROMPT - användaren ändrar h2:an
let userCity = prompt("Vilken stad?");
const h2 = document.querySelector("h2");

// om stad finns i databas = h2 --> stad + (land)
// om stad ej finns i databas = h2 --> stad finns inte i databasen

let cityFound = false;                                                // variabeln "cityFound" håller koll på om vi hittar staden

for (let i = 0; i<cities.length; i++) {                               // skapar for-loop som loopar igenom alla städer i arrayen.
    if (cities[i].name.toLowerCase() === userCity.toLowerCase()) {    // om staden med indexet som loopen är på är strikt lika med användarens stad ska..
        h2.textContent = `${cities[i].name} (${cities[i].country})`;  // staden med indexet som loopen är på + landet med samma index skrivs ut i h2
        cityFound = true;                                             // då ändras variablen "cityFound" till true om vi hittar staden i arrayen
        break;                                                        // avslutar loopen eftersom vi hittat rätt stad
    }
}

if (!cityFound) {                                                     // om cityFound är false...      jämför om användarens stad är samma som falskt
    h2.textContent = `${userCity} finns inte i databasen`             // ändras h2 till staden användaren skriver in + finns inte i databasen
}

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

