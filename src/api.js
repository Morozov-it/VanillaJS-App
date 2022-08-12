
const instanceApi = async (endpoint = '', options = {}) => {
    return fetch('http://localhost:5000' + endpoint, options)
}

export class Question {
    static async getAll() {
        const response = await instanceApi('/questions')
        return await response.json()
    }

    static async getOne(id) {
        return instanceApi(`/questions/${id}`)
    }

    static async getAllByUser(id) {
        const response = await instanceApi(`/questions?userId_like=${id}`)
        return await response.json()
    }

    static async create(question) {
        return instanceApi('/questions', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    static async delete(id) {
        return instanceApi(`/questions/${id}`, {
            method: 'DELETE'
        })
    }
}

export class User {
    static async create(newUser) {
        const response = await instanceApi('/users', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return await response.json()
    }

    static async getAll() {
        const response = await instanceApi('/users')
        return await response.json()
    }

    static async getOne(id) {
        return instanceApi(`/users/${id}`)
    }
}