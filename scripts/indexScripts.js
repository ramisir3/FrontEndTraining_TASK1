var allCountries;
var favourites = [];
async function renderCountries() {
    if (!allCountries) {
        allCountries = await fetchAllCountriesAPI();
    }
    let result = filterCountries(document.getElementById("filter").innerText, allCountries);
    document.getElementById("countriesBody").innerHTML = result;
}

async function searchFilter(listFilter) {
    let results = '';
    let s = document.getElementById("search").value;
    if (listFilter !== undefined) {
        document.getElementById("filter").innerHTML = listFilter + `<i class="fa-solid fa-angle-down" ></i > `;
    } else {
        document.getElementById("filter").innerHTML = "Filter by" + `<i class="fa-solid fa-angle-down" ></i > `;
    }
    let filter = document.getElementById("filter").innerText;
    let mode = checkMode('dark-back ');
    let res;
    if (s) {
        res = await fetchCountriesByName(s);
        if (document.getElementById("search").value == s) {
            if (res.status != 404) {
                results = filterCountries(filter, res);
            } else {
                results = `<div name="dark" class="${mode}">No Results Found</div>`;
            }
        }
    } else {
        results = filterCountries(filter, allCountries);
    }

    if (results === '') {
        results = `<div name="dark" class="${mode} w-100 mt-2 p-3">No Results Found</div>`;
    }
    if (document.getElementById("search").value == s)
        document.getElementById("countriesBody").innerHTML = results;
}


function filterCountries(filter, res) {
    let results = '';
    let mode = checkMode('dark-back ');
    if (filter == "Favourites") {
        for (countryCode of favourites) {
            let countryInfo = res.find(function (element) {
                return countryCode == element.cca3;
            });
            if (countryInfo)
                results += generateCard(countryInfo, mode);
        }
    }
    else {
        res.forEach(element => {
            if ((filter != "Filter by" && element.region != filter)) {
                //if filter is set and the country does not match, skip this country(continue loop).
                //filter text can be (Africa, America, Asia, Europe, Oceania) or the default (Filter by).
                return;
            } else if (element.region == filter || filter == "Filter by") {
                results += generateCard(element, mode);
            }
        }
        );
    }
    return results;
}

async function loadPage() {
    let darkMode = checkMode();
    window.localStorage.setItem('darkMode', JSON.stringify(false));
    favourites = JSON.parse(window.localStorage.getItem('favourites')) || [];
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
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    if (!favourites.includes(data))
        addToFav(data);
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
        favoritesText += `<div class="favTile d-flex">
                                <div class="d-flex align-items-center w-80 flex-grow-1" onclick="location.href='./details.html?country=${countryInfo.cca3}'">
                                    <img src="${countryInfo.flags.svg}" alt="${countryInfo.name.common}" class="tileFlag">
                                    <span class="tileTxt">${countryInfo.name.common}</span>
                                </div>
                                <div class="flex-shrink-1 pe-3">
                                    <strong onclick="removeFromFav('${countryCode}')" class="hover-default">x</strong>
                                </div>
                              </div>`
    }
    document.getElementById(targetID).innerHTML = favoritesText;
}

function generateCard(country, mode) {
    let code = country.cca3;
    let starClass = getStarClass(code);
    let s = `<div class="col-xxl-4 mb-4 mb-xl-0" draggable="true" ondragstart="drag(event)"  id="${code}">
              <div name="dark" class="${mode} gridItem">
                <a name="dark" href="./details.html?country=${country.cca3}" class="${mode} no-border card w-100">
                    <img src="${country.flags.svg}" alt="${country.name.common}" class="flagImg card-img-top">
                    <div class="itemInfo  p-5 pb-0 p-xl-0">
                        <h5 name="dark" class="${mode}card-title mb-4 mb-xxl-2">${country.name.common}</h5>
                        <div name="dark" class="${mode}card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</div>
                        <div name="dark" class="${mode}card-text"><strong>Region:</strong> ${country.region}</div>
                        <div name="dark" class="${mode}card-text"><strong>Capital:</strong> ${country.capital}</div>
                    </div>
                </a>
                    <div name="dark" class="d-xl-none starDiv pb-4 pe-5"  onclick="toggleFav('${code}')"><i name="star" class="${starClass} fa-star" id="${code}Star"></i></div>
              </div>
            </div>`;
    return s;
}

function toggleFav(code) {
    if (favourites.includes(code)) {
        removeFromFav(code);
    } else {
        addToFav(code);
    }
}

function addToFav(code) {
    favourites.push(code);
    window.localStorage.setItem('favourites', JSON.stringify(favourites));
    document.getElementById(code + 'Star').classList.remove("far");
    document.getElementById(code + 'Star').classList.add("fas");
    if (checkMode())
        document.getElementById(code + 'Star').classList.remove("starDark");
    else
        document.getElementById(code + 'Star').classList.remove("starLight");
    document.getElementById(code + 'Star').classList.add("starFav");
    showFavourites("favorites-list");
    searchFilter(document.getElementById('filter').innerText);
}

function removeFromFav(code) {
    favourites.splice(favourites.indexOf(code), 1);
    document.getElementById(code + 'Star').classList.add("far");
    document.getElementById(code + 'Star').classList.remove("fas");
    document.getElementById(code + 'Star').classList.remove("starFav");
    if (checkMode())
        document.getElementById(code + 'Star').classList.add("starDark");
    else
        document.getElementById(code + 'Star').classList.add("starLight");
    window.localStorage.setItem('favourites', JSON.stringify(favourites));
    showFavourites("favorites-list");
    searchFilter(document.getElementById('filter').innerText);
}

function getStarClass(code) {
    if (favourites.includes(code)) {
        return "fas starFav ";
    } else {
        return "far";
    }
}