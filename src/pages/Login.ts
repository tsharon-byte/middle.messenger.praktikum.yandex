import Block from '../utils/Block';
import LoginForm from '../components/LoginForm/LoginForm';

class Login extends Block {
    constructor() {
        super('section', {
            loginForm: new LoginForm()
        });
    }

    render() {
        const template = `<div class="login">
                            <h1 class="login__header">Вход</h1>
                            <form id="loginForm"></form>
                    </div>`;
        return this.compile(template);
    }
}
export default Login;
