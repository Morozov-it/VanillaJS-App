export const isValid = (value) => {
    return value.length >= 10
}

export const addLoader = () => {
    const loader = document.createElement("div")
    loader.innerHTML = `
        <div id="loader">
            <div class="loader"></div>
        </div>
    `
    document.body.appendChild(loader)
}

export const removeLoader = () => {
    const loader = document.getElementById('loader')
    if (loader.parentNode) {
        loader.parentNode.removeChild(loader)
    }
}