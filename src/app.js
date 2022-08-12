import './styles.css'
import { isValid, errorHtml } from './utils'
import { Question } from './api'
import { renderList } from './render'
import { authModal } from './auth'
import { regModal } from './reg'
import { addLoader, removeLoader, getAuthor } from './utils'

export const user = () => JSON.parse(localStorage.getItem('user'))


//первый запуск приложения
window.addEventListener('load', async () => {
    getAuthor(!!user() && user().name)
    if (!user()) {
        renderList()
        return authModal()
    }
    addLoader()
    const questions = await Question.getAllByUser(user().id)
    renderList(questions)
    removeLoader()
})


//модалка регистрации
const reg = document.getElementById('reg-modal')
reg.addEventListener('click', () => {
    regModal()
})


//форма добавления вопроса
const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const button = form.querySelector('#submit')

const submitFormHandler = async (event) => {
    event.preventDefault()
    try {
        if (user()) {
            addLoader()
            const question = {
                text: input.value.trim(),
                date: new Date().toJSON(),
                userId: user().id,
                author: user().name
            }
            await Question.create(question)
            input.value = ''
            input.classList = ''
            const questions = await Question.getAllByUser(user().id)
            renderList(questions)
            removeLoader()
        }
    } catch (e) {
        input.after(errorHtml(e.message))
    }
}

input.addEventListener('input', () => {
    button.disabled = !isValid(input.value)
})
form.addEventListener('submit', submitFormHandler)


//логика модального окна
const modalBtn = document.getElementById('modal-btn')
modalBtn.innerText = 'all'
modalBtn.addEventListener('click', () => {
    
})




