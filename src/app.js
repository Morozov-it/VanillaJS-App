import './styles.css'
import { isValid } from './utils'
import { Question } from './api'
import { renderList } from './render'

//первый запуск приложения
window.addEventListener('load', renderList)

const form = document.getElementById('form')
//для эффективности можно искать в родительском элементе
const input = form.querySelector('#question-input')
const button = form.querySelector('#submit')

const submitFormHandler = (event) => {
    event.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
            userId: 3
        }

        Question.create(question)
            .then(() => {
                input.value = ''
                input.classList = ''
                button.disabled = true
            })
            .then(renderList)
            .catch((e) => console.log(e.message))
    }
}

input.addEventListener('input', () => {
    button.disabled = !isValid(input.value)
})
form.addEventListener('submit', submitFormHandler)


//Testing api methods
// Question.getAll()
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))

// Question.getOne(3)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))


