import Block from '../../utils/Block';
import Button from '../Button/Button';
import {handleSubmit} from '../../utils/validation';
import UserController from '../../controller/UserController';

const FORM_NAME = 'changeAvatarForm';
const button = new Button({className: 'button form__button', children: 'Поменять'});

function handleSubmitCallback(data) {
    console.log('Отправка формы', data);
    const myUserForm = document.getElementById(FORM_NAME);
    const formData = new FormData(myUserForm);
    UserController.updateAvatar(formData);
}

class ChangeAvatarForm extends Block {
    constructor() {

        super('form', {
            attrs: {
                'class': 'popup__form',
                'id': FORM_NAME,
                'name': FORM_NAME,
                novalidate: true
            },
            events: {
                'submit': (event) => handleSubmit(event, FORM_NAME, button, handleSubmitCallback)
            },
            button
        });
    }

    render() {
        const template = `<h2 class="form__title">Загрузите файл</h2>
                          <input class="form__file" id="avatar" type="file" name="avatar" accept="image/*">
                          <button id="button"></button>`;
        return this.compile(template);
    }
}

export default ChangeAvatarForm;
