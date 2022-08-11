export class LocalStorage {
    static getQuestions() {
        return JSON.parse(localStorage.getItem('questions') || '[]') 
    }

    static addQuestion(question) {
        const questions = LocalStorage.getQuestions()
        questions.push(question)
        localStorage.setItem('questions', JSON.stringify(questions))
    }

}
