import { User } from "./api"
import { closeModal } from "./utils"
import { authModal } from './auth'

const regFormHtml = () => {
    return `
        <form class="mui-form" id="reg-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="text" id="reg-name" required>
                <label for="reg-name">name</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="reg-password" required>
                <label for="reg-password">password</label>
            </div>
            <button
                type="submit"
                id="reg-submit"
                class="mui-btn mui-btn--primary"
            >
                Add
            </button>
            <button class="mui-btn mui-btn--flat mui-btn--primary" id="to-auth">login</button>
            <button class="mui-btn" id="reg-close">Close</button>
        </form>
    `
}

export const regSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.querySelector('#reg-name').value
    const password = e.target.querySelector('#reg-password').value
    const button = e.target.querySelector('#reg-submit')

    try {
        button.disabled = true
        const newUser = await User.create({ name, password })
        const node = document.createElement('p')
        node.innerText = `You have registered user named ${newUser.name}`
        button.before(node)
    } catch (e) {
        button.after(errorHtml(e.message))
    }
}

export const regModal = () => {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.innerHTML = `
        <div class="modal-body">
            <h1>Registration</h1>
            <div class="mui-divider"></div>
            <div class="modal-content">${regFormHtml()}</div>
        </div>
    `
    document.body.appendChild(modal)
    document.getElementById('reg-form').addEventListener('submit', regSubmit)
    document.getElementById('to-auth').addEventListener('click', () => {
        closeModal()
        authModal()
    }, { once: true })
    document.getElementById('reg-close').addEventListener('click', closeModal, { once: true })
}