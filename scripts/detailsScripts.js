async function renderCountry() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const countryCode = urlParams.get('country');
    let country = (await fetchCountriesAlpha(countryCode))[0];
    let bodyHTML = '';
    let countryQueryLanguages = country.languages;
    let languagesValue = Object.values(countryQueryLanguages);
    let segment = `<div class="col-xxl-5 col-sm-12 mb-5 mb-xxl-0">
                <img src="${country.flags.svg}" alt="${country.name.common}" class="flag-img">
            </div>
            <div class="col-xl-6 mt-5 ">
                <div class="country-info row">
                    <h2 name="text" class="h2-custom">${country.name.official}</h2>
                    <div class="col-xl">
                        <div name="text" class="py-1 country-info-text"><strong>Native Name: </strong> ${Object.values(country.name.nativeName)[0].common}</div>
                        <div name="text" class="py-1 country-info-text"><strong>Population: </strong> ${country.population.toLocaleString()}</div>
                        <div name="text" class="py-1 country-info-text"><strong>Region: </strong> ${country.region}</div>
                        <div name="text" class="py-1 country-info-text"><strong>Capital: </strong> ${country.capital || "None"}</div>
                        <div name="text" class="py-1 country-info-text"><strong>Sub Region: </strong> ${country.subregion}</div>
                    </div>
                    <div class="col-xl mt-5 mt-xxl-0">
                        <div name="text" class="py-1 country-info-text"><strong>Top Level Domain: </strong> ${country.tld}</div>
                        <div name="text" class="py-1 country-info-text"><strong>Currencies: </strong> ${Object.values(country.currencies).map(el => el.name).join(",")}</div>
                        <div name="text" class="py-1 country-info-text"><strong>Languages: </strong> ${languagesValue.join(", ")}</div>
                    </div>
                </div>
                <div name="text" class="border-countries ">
                    <div class="border-text"><strong>Border Countries: </strong></div>
                    <div class="countries-btns">
                    </div>
                </div>
            </div>`;
    bodyHTML += segment;
    document.getElementById("countryInfo").innerHTML = bodyHTML;
    let borderCountries = country.borders;
    let borderRefrenceButtonMode = checkMode('dark-ref-shadow');
    if (borderCountries) {
        borderCountries.forEach(async element => {
            try {
                let borderCountry = await fetchCountriesAlpha(element);
                bodyHTML = `<a name="dark-ref-shadow" class="${borderRefrenceButtonMode} back-btn country-btn" href="details.html?country=${borderCountry[0].cca3}">${borderCountry[0].name.common}</a>`
                document.getElementsByClassName("countries-btns")[0].innerHTML += bodyHTML
            } catch (error) {
                console.log(error);
            }
        })
    } else {
        document.getElementsByClassName("countries-btns")[0].innerHTML += `<button disabled name="dark-ref-shadow" class="back-btn country-btn" type="button">None</button>`
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