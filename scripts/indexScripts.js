var allCountries;
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
        document.getElementById("filter").innerHTML = "Filter by Region" + `<i class="fa-solid fa-angle-down" ></i > `;
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
        results = `<div name="dark" class="${mode}">No Results Found</div>`;
    }
    if (document.getElementById("search").value == s)
        document.getElementById("countriesBody").innerHTML = results;
}


function filterCountries(filter, res) {
    let results = '';
    let mode = checkMode('dark-back ');
    res.forEach(element => {
        if ((filter.length < 10 && element.region != filter)) {
            //if filter is set and the country does not match, skip this country(continue loop).
            //filter text can be (Africa, America, Asia, Europe, Oceania) or the default (Filter by Region).
            //using the length of the string from the filter list, we can know if a filter is set.
            return;
        } else if (element.region == filter || filter.length > 10) {
            //if the country is in the filter, or there isn't a filter, add country.
            results += `<div class="col-xxl-3">
                                                <a name="dark" href="./details.html?country=${element.name.common}" class="${mode}gridItem card rounded w-100">
                                                    <img src="${element.flags.svg}" alt="${element.name.common}" class="flagImg card-img-top">
                                                    <div class="itemInfo  p-5 p-xl-0">
                                                        <h5 name="dark" class="${mode}card-title mb-4 mb-xxl-2">${element.name.common}</h5>
                                                        <div name="dark" class="${mode}card-text"><strong>Population:</strong> ${element.population.toLocaleString()}</div>
                                                        <div name="dark" class="${mode}card-text"><strong>Region:</strong> ${element.region}</div>
                                                        <div name="dark" class="${mode}card-text"><strong>Capital:</strong> ${element.capital}</div>
                                                    </div>
                                                </a>
                                            </div>`;
        }
    }
    );
    return results;
}

async function loadPage() {
    let darkMode = checkMode();
    window.localStorage.setItem('darkMode', JSON.stringify(false));
    if (darkMode == true) {
        switchMode('index');
    }
    await renderCountries();
}
