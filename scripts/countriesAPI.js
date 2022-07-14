async function fetchCountriesAPI(url, name) {
    try {
        if (name === undefined) {
            var res = await fetch(url);
        } else {
            var res = await fetch(url + name);
        }
        return await res.json();
    } catch (error) {
        // console.log(error);
    }
}