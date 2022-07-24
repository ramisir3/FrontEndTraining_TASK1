var allCountries;
var favourites = [];

async function renderCountries() {
    if (!allCountries) {
        allCountries = await fetchAllCountriesAPI();
    }
    let result = filterCountries(document.getElementById("filter").innerText.trim(), allCountries);

    document.getElementById("countriesBody").innerHTML = result;
}

async function searchFilter(listFilter) {
    let filteredResults = '';
    let searchString = document.getElementById("search").value;
    let darkBackMode = checkMode('dark-back');
    let searchResult;
    let filter;

    if (listFilter !== undefined) {
        document.getElementById("filter").innerHTML = listFilter + `<i class="fa-solid fa-angle-down" ></i >`;
    } else {
        document.getElementById("filter").innerHTML = "Filter by" + `<i class="fa-solid fa-angle-down" ></i >`;
    }
    filter = document.getElementById("filter").innerText.trim();

    if (searchString) {
        searchResult = await fetchCountriesByName(searchString);
        if (document.getElementById("search").value == searchString) {
            if (searchResult.status != 404) {
                filteredResults = filterCountries(filter, searchResult);
            } else {
                filteredResults = `<div name="dark" class="${darkBackMode}">No results Found</div>`;
            }
        }
    } else {
        filteredResults = filterCountries(filter, allCountries);
    }

    if (filteredResults === '') {
        filteredResults = `<div name="dark" class="${darkBackMode} w-100 mt-2 p-3">No results Found</div>`;
    }
    if (document.getElementById("search").value == searchString) {
        document.getElementById("countriesBody").innerHTML = filteredResults;
    }
}


function filterCountries(filter, searchResult) {
    let filteredResults = '';
    let darkBackMode = checkMode('dark-back');

    if (filter == "Favourites") {
        for (countryCode of favourites) {
            let countryInfo = searchResult.find(function (element) {
                return countryCode == element.cca3;
            });
            if (countryInfo) {
                filteredResults += generateCard(countryInfo, darkBackMode);
            }
        }
    }
    else {
        searchResult.forEach(element => {
            if ((filter != "Filter by" && element.region != filter)) {
                //if filter is set and the country does not match, skip this country(continue loop).
                //filter text can be (Africa, America, Asia, Europe, Oceania) or the default (Filter by).
                return;
            } else if (element.region == filter || filter == "Filter by") {
                filteredResults += generateCard(element, darkBackMode);
            }
        }
        );
    }
    return filteredResults;
}

async function loadPage() {
    let darkMode = checkMode();
    favourites = JSON.parse(window.localStorage.getItem('favourites')) || [];

    window.localStorage.setItem('darkMode', JSON.stringify(false));

    await renderCountries().then(() => {
        showFavourites("favorites-list");
        if (darkMode == true) {
            switchMode('index');
        }
    });

}


function allowDrop(ev) {
    ev.preventDefault();
    document.getElementsByClassName("favorites-section")[0].style.outline = "1px solid #27ae60";
}


function drag(ev) {
    ev.dataTransfer.setData("text/html", ev.currentTarget.id);

    let card = document.getElementById(ev.currentTarget.id);
    ev.dataTransfer.setDragImage(card, 0, 0);

    card.style.opacity = "0.5";
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    if (!favourites.includes(data)) {
        addToFav(data);
    }
    removeOutline();
}


function removeOutline(ev) {
    document.getElementsByClassName("favorites-section")[0].style.outline = "none";
}


function showFavourites(targetID) {
    let favoritesText = '';
    document.getElementById(targetID).innerHTML = favoritesText;

    for (countryCode of favourites) {
        let countryInfo = allCountries.find(function (element) {
            return countryCode == element.cca3;
        });
        favoritesText += `<div class="fav-tile d-flex">
                                <div class="d-flex align-items-center w-80 flex-grow-1" onclick="location.href='./details.html?country=${countryInfo.cca3}'">
                                    <img src="${countryInfo.flags.svg}" alt="${countryInfo.name.common}" class="tile-flag">
                                    <span class="tile-txt">${countryInfo.name.common}</span>
                                </div>
                                <div class="flex-shrink-1 pe-3">
                                    <strong onclick="removeFromFav('${countryCode}')" class="hover-default">x</strong>
                                </div>
                              </div>`
    }
    document.getElementById(targetID).innerHTML = favoritesText;
}

function generateCard(country, darkModeClass) {
    let countryCode = country.cca3;
    let starClass = getStarClass(countryCode);
    let divMode = checkMode("dark-div");
    let starMode = checkMode() ? "star-dark" : "star-light";
    let cardHTML = `<div class="col-xxl-4 mb-4 mb-xl-0" draggable="true" ondragstart="drag(event)"  id="${countryCode}">
              <div name="dark" class="${darkModeClass} grid-item">
                <a name="dark" href="./details.html?country=${country.cca3}" class="${darkModeClass} no-border card w-100">
                    <img src="${country.flags.svg}" alt="${country.name.common}" class="flag-img card-img-top">
                    <div class="item-info  p-5 pb-0 p-xl-0">
                        <h5 name="dark" class="${darkModeClass} h5-custom card-title mb-4 mb-xxl-2">${country.name.common}</h5>
                        <div name="dark" class="${darkModeClass} card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</div>
                        <div name="dark" class="${darkModeClass} card-text"><strong>Region:</strong> ${country.region}</div>
                        <div name="dark" class="${darkModeClass} card-text"><strong>Capital:</strong> ${country.capital}</div>
                    </div>
                </a>
                    <div name="dark-div" class="${divMode} d-xl-none star-div pb-4 pe-5"><i name="star" class="${starMode} ${starClass} fa-star" id="${countryCode}Star" onclick="toggleFav('${countryCode}')"></i></div>
              </div>
            </div>`;
    return cardHTML;
}

function toggleFav(code) {
    favourites.includes(code) ? removeFromFav(code) : addToFav(code);
}

function addToFav(code) {
    favourites.push(code);

    window.localStorage.setItem('favourites', JSON.stringify(favourites));

    document.getElementById(code + 'Star').classList.remove("far");
    document.getElementById(code + 'Star').classList.add("fas");
    document.getElementById(code + 'Star').classList.add("star-fav");

    showFavourites("favorites-list");
    searchFilter(document.getElementById('filter').innerText);
}

function removeFromFav(code) {
    favourites.splice(favourites.indexOf(code), 1);
    window.localStorage.setItem('favourites', JSON.stringify(favourites));

    document.getElementById(code + 'Star').classList.remove("fas");
    document.getElementById(code + 'Star').classList.remove("star-fav");
    document.getElementById(code + 'Star').classList.add("far");

    showFavourites("favorites-list");
    searchFilter(document.getElementById('filter').innerText);
}

function getStarClass(code) {
    return favourites.includes(code) ? "fas star-fav" : "far";
}