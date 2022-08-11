
const instanceApi = async (endpoint = '', options = {}) => {
    return fetch('http://localhost:5000' + endpoint, options)
}

export class Question {
    static async getAll() {
        return instanceApi('/questions').then((response) => response.json())
    }

    static async getOne(id) {
        return instanceApi(`/questions/${id}`)
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