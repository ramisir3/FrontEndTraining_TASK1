async function renderCountry() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const countryCode = urlParams.get('country');
    let country = (await fetchCountriesAlpha(countryCode))[0];
    let bodyHTML = '';
    let lang = country.languages;
    let languages = Object.values(lang);
    let mode = checkMode('darkShadow ');
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
                        <div name="text" class="py-1"><strong>Capital: </strong> ${country.capital || "None"}</div>
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
    let mode2 = checkMode('dark-ref-shadow');
    if (border) {
        border.forEach(async element => {
            try {
                let borderCountry = await fetchCountriesAlpha(element);
                bodyHTML = `<a name="darkRefShadow" class="${mode2} backBtn countryBtn" href="details.html?country=${borderCountry[0].cca3}">${borderCountry[0].name.common}</a>`
                document.getElementsByClassName("countriesBtns")[0].innerHTML += bodyHTML
            } catch (error) {
                console.log(error);
            }
        })
    } else {
        document.getElementsByClassName("countriesBtns")[0].innerHTML += `<button disabled name="darkRefShadow" class="backBtn countryBtn" type="button">None</button>`
    }

}

async function loadPage() {
    await renderCountry();
    let darkMode = checkMode();
    window.localStorage.setItem('darkMode', JSON.stringify(false));
    if (darkMode == true) {
        switchMode();
    }
}