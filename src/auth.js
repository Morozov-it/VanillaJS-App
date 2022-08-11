export const authFormHtml = () => {
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
        </form>
    `
}

export const authSubmit = (e) => {
    e.preventDefault()
    const name = e.target.querySelector('#auth-name').value
    const password = e.target.querySelector('#auth-password').value

    console.log(name, password)
}