import { authModal, logout } from "./auth"

export const isValid = (value) => {
    return value.length >= 10
}

export const errorHtml = (text) => {
    const error = document.createElement('p')
    error.className = 'error'
    error.innerText = text
    return error
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

export const closeModal = () => {
    const modal = document.querySelector('.modal')
    if (modal.parentNode) {
        modal.parentNode.removeChild(modal)
    }
}

//TODO: create new file navbar
export const getAuthor = (name = '') => {
    const div = document.getElementById('author')
    if (!!name) {
        div.innerHTML = `
            <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
                <span class="author-name">${name}</span>
                <span class="mui-caret"></span>
            </button>
            <ul class="mui-dropdown__menu">
                <li id="logout"><a>log out</a></li>
            </ul>
        `
        div.querySelector('#logout').addEventListener('click', logout)
    } else {
        div.innerHTML = `
            <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
                <span class="author-name">Author</span>
                <span class="mui-caret"></span>
            </button>
            <ul class="mui-dropdown__menu">
                <li id="login"><a>log in</a></li>
            </ul>
        `
        div.querySelector('#login').addEventListener('click', authModal)
    }
}