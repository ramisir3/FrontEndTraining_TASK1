function switchMode(page) {
    window.localStorage.setItem('darkMode', JSON.stringify(!JSON.parse(window.localStorage.getItem('darkMode'))));

    if (page == 'index') {
        document.getElementById("search").classList.toggle("search-dark");
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