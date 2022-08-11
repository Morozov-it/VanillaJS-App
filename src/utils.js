import { authSubmit } from "./auth"

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

export const closeModal = () => {
    const modal = document.querySelector('.modal')
    if (modal.parentNode) {
        modal.parentNode.removeChild(modal)
    }
}

export const openModal = (title = '', content = '') => {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.innerHTML = `
        <div class="modal-body">
            <h1>${title}</h1>
            <div class="mui-divider"></div>
            <div class="modal-content">${content}</div>
        </div>
    `
    modal.addEventListener('click', closeModal, { once: true })
    document.body.appendChild(modal)
    document.querySelector('.modal-body').addEventListener('click', (e) => {
        e.stopPropagation()
    })
    document.getElementById('auth-form').addEventListener('submit', authSubmit)
}