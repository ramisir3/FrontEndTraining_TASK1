async function fetchCountriesAPI(url, name) {
    try {
        if (name === undefined) {
            var res = await fetch(url);
        } else {
            var res = await fetch(url + name);
        }
        return await res.json();
    } catch (error) {
        return new Error("Server Error, please try again later.");
    }
}
async function fetchAllCountriesAPI() {
    let url = 'https://restcountries.com/v3.1/all';

    try {
        var res = await fetch(url);
        return await res.json();
    } catch (error) {
        return new Error("Server Error, please try again later.");
    }
}


async function fetchCountriesByName(name) {
    let url = 'https://restcountries.com/v3.1/name/' + name;

    try {
        var res = await fetch(url);
        return await res.json();
    } catch (error) {
        return new Error("Server Error, please try again later.");
    }
}

async function fetchCountriesAlpha(name) {
    let url = 'https://restcountries.com/v3.1/alpha/' + name;

    try {
        var res = await fetch(url);
        return await res.json();
    } catch (error) {
        return new Error("Server Error, please try again later.");
    }
}