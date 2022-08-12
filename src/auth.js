import { Question, User } from './api'
import { renderList } from './render'
import { regModal } from './reg'
import { closeModal, errorHtml, getAuthor } from './utils'

const authFormHtml = () => {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="text" id="auth-name" required>
                <label for="auth-name">name</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="auth-password" required>
                <label for="auth-password">password</label>
            </div>
            <button
                type="submit"
                id="auth-submit"
                class="mui-btn mui-btn--raised mui-btn--primary"
            >
                Login
            </button>
            <button class="mui-btn mui-btn--flat mui-btn--primary" id="to-registration">Registration</button>
            <button class="mui-btn" id="auth-close">Close</button>
        </form>
    `
}

export const logout = () => {
    localStorage.removeItem('user')
    renderList([])
    getAuthor()
}

export const authSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.querySelector('#auth-name')
    const password = e.target.querySelector('#auth-password')
    const button = e.target.querySelector('#auth-submit')
    name.addEventListener('input', () => {
        button.disabled = false
        document.querySelectorAll('.error').forEach((node) => {
            node && node.parentNode.removeChild(node)
        })
    }, { once: true })
    password.addEventListener('input', () => {
        button.disabled = false
        document.querySelectorAll('.error').forEach((node) => {
            node && node.parentNode.removeChild(node)
        })
    }, { once: true })

    try {
        button.disabled = true
        const allUsers = await User.getAll()
        const candidate = allUsers.find((user) => user.name === name.value)

        if (candidate) {
            if (candidate.password === password.value) {
                localStorage.setItem('user', JSON.stringify(candidate))
                getAuthor(candidate.name)
                const questions = await Question.getAllByUser(candidate.id)
                renderList(questions)
                closeModal()
            } else {
                return password.after(errorHtml('Password is incorrect'))
            }
        } else {
            return name.after(errorHtml('Name is incorrect'))
        }
    } catch (e) {
        button.after(errorHtml(e.message))
    }
}

export const authModal = () => {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.innerHTML = `
        <div class="modal-body">
            <h1>Log in</h1>
            <div class="mui-divider"></div>
            <div class="modal-content">${authFormHtml()}</div>
        </div>
    `
    document.body.appendChild(modal)
    document.getElementById('auth-form').addEventListener('submit', authSubmit)
    document.getElementById('to-registration').addEventListener('click', () => {
        closeModal()
        regModal()
    }, { once: true })
    document.getElementById('auth-close').addEventListener('click', closeModal, { once: true })
}
