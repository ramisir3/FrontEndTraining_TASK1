var allCountries;
async function renderCountries() {
    if (!allCountries) {
        let url = 'https://restcountries.com/v3.1/all';
        allCountries = await fetchCountriesAPI(url);
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
    let mode = JSON.parse(window.localStorage.getItem('darkMode')) == true ? 'dark-back ' : '';
    let res;
    if (s !== null && s !== '') {
        let url = 'https://restcountries.com/v3.1/name/';
        res = await fetchCountriesAPI(url, s);
        console.log(document.getElementById("search").value == s);
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
    let mode = JSON.parse(window.localStorage.getItem('darkMode')) == true ? 'dark-back ' : '';
    res.forEach(element => {
        if ((filter.length < 10 && element.region != filter)) {
            return;
        } else {
            if (element.region == filter || filter.length > 10) {
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
    }
    );
    return results;
}

async function loadPage() {
    let darkMode = JSON.parse(window.localStorage.getItem('darkMode'));
    window.localStorage.setItem('darkMode', JSON.stringify(false));
    if (darkMode == true) {
        switchMode('index');
    }
    await renderCountries();
}
