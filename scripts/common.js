function switchMode(page) {
    let darkMode = JSON.parse(window.localStorage.getItem('darkMode'));
    let dark = document.getElementsByName("dark");
    let icons = document.getElementsByName("icon");
    let shadow = document.getElementsByName("dark-shadow");
    let text = document.getElementsByName("text");
    let refs = document.getElementsByName("dark-ref");

    window.localStorage.setItem('darkMode', JSON.stringify(!darkMode));

    if (page == 'index') {
        let scrollables = document.getElementsByClassName("scroll-down");
        let stars = document.getElementsByName("star");
        let div = document.getElementsByName("dark-div");

        document.getElementById("search").classList.toggle("search-dark");
        for (element of scrollables) {
            element.classList.toggle("dark-bar");
            element.classList.toggle("light-bar");
        }
        stars.forEach(element => {
            if (!favourites.includes(element.parentElement.parentElement.ID)) {
                element.classList.toggle("star-dark");
                element.classList.toggle("star-light");
            }
        });
        div.forEach(element => {
            element.classList.toggle("dark-div");
        });

    } else {
        let refsShadow = document.getElementsByName("dark-ref-shadow");

        refsShadow.forEach(element => {
            element.classList.toggle("dark-ref-shadow");
        });
    }

    document.getElementById("body").classList.toggle("very-dark-back");
    dark.forEach(element => {
        element.classList.toggle("dark-back");
    });
    icons.forEach(element => {
        element.classList.toggle("dark-icon");
    });
    shadow.forEach(element => {
        element.classList.toggle("dark-shadow");
    });
    text.forEach(element => {
        element.classList.toggle("white-font");
    });
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