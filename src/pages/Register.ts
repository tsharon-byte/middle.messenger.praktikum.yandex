import Block from '../utils/Block';
import RegisterForm from '../components/RegisterForm/RegisterForm';

class Register extends Block {
    constructor(props) {
        super('section', {
            ...props,
            registerForm: new RegisterForm({})
        });
    }

    render() {
        const template = `<div class="login register">
                            <h1 class="login__header">Регистрация</h1>
                            <form id="registerForm"></form>
                          </div>`;
        return this.compile(template);
    }
}
export default Register;
