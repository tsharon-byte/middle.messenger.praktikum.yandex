import Block from './Block';

export function onInput(event, name: string, submitButton: Block, form: string) {
    event.preventDefault();
    const formElement = document.getElementsByName(form)[0];
    const selector = '#' + name + '-error';
    const el = formElement.querySelector(selector);
    if (event.target.validity.valid) {
        el.textContent = '';
        if (checkFormIsValid(form)) {
            submitButton.removeAttributes(['disabled']);
        } else {
            submitButton.addAttributes({'disabled': true});
        }
    } else {
        el.textContent = event.target.validationMessage;
        submitButton.addAttributes({'disabled': true});
    }
}

export function checkPassword(event, form: string, pwd: string, pwd2: string, submitButton: Block) {
    event.preventDefault();
    const formElement = document.getElementsByName(form)[0];
    const password: HTMLInputElement | null = formElement.querySelector(`[name=${pwd}]`);
    const password2: HTMLInputElement | null = formElement.querySelector(`[name=${pwd2}]`);
    const selector = '#' + pwd2 + '-error';
    const el = formElement.querySelector(selector);
    if (password && password2 && password.value !== password2.value) {
        el.textContent = 'Пароли не совпадают';
        submitButton.addAttributes({'disabled': true});
    }
}

export function getFormValues(name: string): object {
    const values = {};
    const formEl = document.getElementsByName(name)[0];
    const inputs = formEl.querySelectorAll('input');
    for (const input of inputs) {
        values[input.name] = input.value;
    }
    return values;
}

function checkFormIsValid(form: string): boolean {
    const formEl = document.getElementsByName(form)[0];
    const inputs = formEl.querySelectorAll('input');
    for (const input of inputs) {
        if (!input.validity.valid) {
            return false;
        }
    }
    return true;
}
