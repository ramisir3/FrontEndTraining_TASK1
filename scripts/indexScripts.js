var allCountries;
async function fetchCountriesAPI() {
    let url = 'https://restcountries.com/v3.1/all';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getCountries(filter) {
    if (!allCountries) {
        allCountries = await fetchCountriesAPI();
    }
    let countries = allCountries;
    let bodyHTML = '';
    if (filter === "NO") {
        countries.forEach(country => {
            let segment = `<div class="col-xxl-3">
                    <a name="dark" href="./details.html?country=${country.name.common}" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}gridItem card rounded w-100">
                        <img src="${country.flags.svg}" alt="${country.name.common}" class="flagImg card-img-top">
                        <div class="itemInfo  p-5 p-xl-0">
                            <h5 name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-title mb-4 mb-xxl-2">${country.name.common}</h5>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</div>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Region:</strong> ${country.region}</div>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Capital:</strong> ${country.capital}</div>
                        </div>
                    </a>
                </div>`;
            bodyHTML += segment;
        })
    } else {
        countries.forEach(country => {
            if (country.region === filter) {
                let segment = `<div class="col-xxl-3">
                    <a name="dark" href="./details.html?country=${country.name.common}" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}gridItem card rounded w-100">
                        <img src="${country.flags.svg}" alt="${country.name.common}" class="flagImg card-img-top">
                        <div class="itemInfo  p-5 p-xl-0">
                            <h5 name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-title mb-4 mb-xxl-2">${country.name.common}</h5>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</div>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Region:</strong> ${country.region}</div>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Capital:</strong> ${country.capital}</div>
                        </div>
                    </a>
                </div>`;
                bodyHTML += segment;
            }
        })
    }

    document.getElementById("countriesBody").innerHTML = bodyHTML;
}

function searchFilter() {
    let results = '';
    let s = document.getElementById("search").value;
    allCountries.forEach(element => {
        if (element.name.common.toLowerCase().includes(s)) {
            results += `<div class="col-xxl-3">
                    <a name="dark" href="./details.html?country=${element.name.common}" class="${getCookie('darkMode') == "1" ? "darkShadow " : ""}gridItem card rounded w-100">
                        <img src="${element.flags.svg}" alt="${element.name.common}" class="flagImg card-img-top">
                        <div class="itemInfo  p-5 p-xl-0">
                            <h5 name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-title mb-4 mb-xxl-2">${element.name.common}</h5>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Population:</strong> ${element.population.toLocaleString()}</div>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Capital:</strong> ${element.capital}</div>
                            <div name="dark" class="${getCookie('darkMode') == "1" ? "dark-back " : ""}card-text"><strong>Region:</strong> ${element.region}</div>
                        </div>
                    </a>
                </div>`
        }
    });
    document.getElementById("countriesBody").innerHTML = results;

}


function filter(filter) {
    getCountries(filter);
    document.getElementById("filter").innerHTML = filter + `<i class="fa-solid fa-angle-down" ></i > `;
}

async function loadPage() {
    let darkMode = getCookie("darkMode");
    if (darkMode == 1) {
        setCookie("darkMode", 0, 365);
        switchMode();
    } else {
        setCookie("darkMode", 0, 365);
    }
    await getCountries("NO");
}

function switchMode() {
    if (getCookie("darkMode") == 0) {
        setCookie("darkMode", 1, 365);
    } else {
        setCookie("darkMode", 0, 365);
    }

    document.getElementById("body").classList.toggle("very-dark-back");
    let dark = document.getElementsByName("dark");
    dark.forEach(element => {
        element.classList.toggle("dark-back");
    });
    let shadow = document.getElementsByName("darkshadow");
    shadow.forEach(element => {
        element.classList.toggle("darkShadow");
    });
    document.getElementById("search").classList.toggle("search-dark");
    let icons = document.getElementsByName("icon");
    icons.forEach(element => {
        element.classList.toggle("dark-icon");
    });

    let refs = document.getElementsByName("dark-ref");
    refs.forEach(element => {
        element.classList.toggle("dark-ref");
    });

}
