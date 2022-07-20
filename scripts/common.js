function switchMode(page) {
    window.localStorage.setItem('darkMode', JSON.stringify(!JSON.parse(window.localStorage.getItem('darkMode'))));

    if (page == 'index') {
        document.getElementById("search").classList.toggle("search-dark");
        let scrollables = document.getElementsByClassName("scrolldown");
        for (element of scrollables) {
            element.classList.toggle("darkBar");
            element.classList.toggle("lightBar");
        }
        let stars = document.getElementsByName("star");
        stars.forEach(element => {
            if (!favourites.includes(element.parentElement.parentElement.ID)) {
                element.classList.toggle("starDark");
                element.classList.toggle("starLight");
            }
        });

    } else {
        let refsShadow = document.getElementsByName("darkRefShadow");
        refsShadow.forEach(element => {
            element.classList.toggle("dark-ref-shadow");
        });
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

function checkMode(className) {
    let mode;
    if (className) {
        mode = JSON.parse(window.localStorage.getItem('darkMode')) == true ? className : '';
    } else {
        mode = JSON.parse(window.localStorage.getItem('darkMode'));
    }
    return mode;
}