async function fetchCountriesAPI(countryName) {
    let url = 'https://restcountries.com/v3.1/name/' + countryName;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
let country;
async function getCountry() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const countryName = urlParams.get('country');
    country = (await fetchCountriesAPI(countryName))[0];
    let bodyHTML = '';
    let lang = country.languages;
    let languages = Object.values(lang)
    let segment = `<div class="col-xxl-5 col-sm-12 mb-5 mb-xxl-0">
                <img src="${country.flags.svg}" alt="${country.name.common}" class="flagImg">
            </div>
            <div class="col-xl-6 mt-5 ">
                <div class="countryInfo row">
                    <h2 name="text" >${country.name.official}</h2>
                    <div class="col-xl">
                        <div name="text" class="py-1"><strong>Native Name: </strong> ${Object.values(country.name.nativeName)[0].common}</div>
                        <div name="text" class="py-1"><strong>Population: </strong> ${country.population.toLocaleString()}</div>
                        <div name="text" class="py-1"><strong>Region: </strong> ${country.region}</div>
                        <div name="text" class="py-1"><strong>Capital: </strong> ${country.capital ? country.capital : "None"}</div>
                        <div name="text" class="py-1"><strong>Sub Region: </strong> ${country.subregion}</div>
                    </div>
                    <div class="col-xl mt-5 mt-xxl-0">
                        <div name="text" class="py-1"><strong>Top Level Domain: </strong> ${country.tld}</div>
                        <div name="text" class="py-1"><strong>Currencies: </strong> ${Object.values(country.currencies).map(el => el.name).join(",")}</div>
                        <div name="text" class="py-1"><strong>Languages: </strong> ${languages.join(", ")}</div>
                    </div>
                </div>
                <div name="text" class="borderCountries ">
                    <div class="borderText"><strong>Border Countries: </strong></div>
                    <div class="countriesBtns">
                    </div>
                </div>
            </div>`;
    bodyHTML += segment;
    document.getElementById("countryInfo").innerHTML = bodyHTML;
    let border = country.borders;
    if (border) {
        border.forEach(async element => {
            let url = 'https://restcountries.com/v3.1/alpha/' + element;
            try {
                let res = await fetch(url);
                let borderCountry = await res.json();
                bodyHTML = `<button name="dark" class="${getCookie('darkMode') == "1" ? "darkshadow " : ""} backBtn countryBtn" type="button" onclick="location.href='details.html?country=${borderCountry[0].name.common}'">${borderCountry[0].name.common}</button>`
                document.getElementsByClassName("countriesBtns")[0].innerHTML += bodyHTML
            } catch (error) {
                console.log(error);
            }
        })
    } else {
        document.getElementsByClassName("countriesBtns")[0].innerHTML += `<button name="darkshadow" class="backBtn countryBtn" type="button">None</button>`
    }

}

async function loadPage() {
    await getCountry();
    let darkMode = getCookie("darkMode");
    if (darkMode == 1) {
        setCookie("darkMode", 0, 365);
        switchMode();
    } else {
        setCookie("darkMode", 0, 365);
    }
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
    let icons = document.getElementsByName("icon");
    icons.forEach(element => {
        element.classList.toggle("dark-icon");
    });
    let shadow = document.getElementsByName("darkshadow");
    shadow.forEach(element => {
        element.classList.toggle("darkShadow");
    });

    let text = document.getElementsByName("text");
    text.forEach(element => {
        element.classList.toggle("whiteFont");
    });
    let refs = document.getElementsByName("dark-ref");
    refs.forEach(element => {
        element.classList.toggle("dark-ref");
    });
}