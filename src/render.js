import { Question } from './api'
import { addLoader, removeLoader } from './utils'

const toCard = (question) => {
    return `
        <div class="mui-panel">
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

export const renderList = async () => {
    addLoader()
    const questions = await Question.getAll()

    const html = !!questions.length
        ? questions.map(toCard).join('')
        : `<div class="mui--text-headline">No questions yet</div>`

    const list = document.getElementById('list')
    list.innerHTML = html

    const deleteButtons = document.getElementsByName('delete-btn')
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            e.target.disabled = true
            await Question.delete(e.target.dataset.id)
            await renderList()
        })
    })
    removeLoader()
}

