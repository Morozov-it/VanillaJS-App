import { Question } from './api'
import { user } from './app'
import { addLoader, removeLoader } from './utils'

const card = (question) => {
    return `
        <div class="mui-panel">
            <div class="mui--text-subhead mui--text-dark-secondary">${question.author}</div>
            <div class="mui--text-black-54">
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </div>
            <div>
                <p>${question.text}</p>
                <button
                    class="mui-btn mui-btn--flat mui-btn--danger"
                    data-id=${question.id}
                    name="delete-btn"
                >delete</button>
            </div>
        </div>
    `
}

export const renderList = (questions = []) => {
    const html = !!questions.length
        ? questions.map(card).join('')
        : `<div class="mui--text-headline">No questions yet</div>`

    const list = document.getElementById('list')
    list.innerHTML = html

    const deleteButtons = list.querySelectorAll("button[name='delete-btn']")
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            e.target.disabled = true
            addLoader()
            await Question.delete(e.target.dataset.id)
            const questions = await Question.getAllByUser(user().id)
            renderList(questions)
            removeLoader()
        })
    })
}
