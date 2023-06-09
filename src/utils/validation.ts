import Block from './Block/Block';

export function onInput(event: Event, name: string, submitButton: Block, form: string) {
    event.preventDefault();
    const formElement = document.getElementsByName(form)[0];
    const selector = '#' + name + '-error';
    const el = formElement.querySelector(selector);
    if (el && event.target && (event.target as HTMLInputElement).validity) {
        if ((event.target as HTMLInputElement).validity.valid) {
            el.textContent = '';
            if (checkFormIsValid(form)) {
                submitButton.removeAttributes(['disabled']);
            } else {
                submitButton.addAttributes({'disabled': true});
            }
        } else {
            el.textContent = (event.target as HTMLInputElement).validationMessage;
            submitButton.addAttributes({'disabled': true});
        }
    }
}

export function checkPassword(event: Event, form: string, pwd: string, pwd2: string, submitButton: Block) {
    event.preventDefault();
    const formElement = document.getElementsByName(form)[0];
    const password: HTMLInputElement | null = formElement.querySelector(`[name=${pwd}]`);
    const password2: HTMLInputElement | null = formElement.querySelector(`[name=${pwd2}]`);
    const selector = '#' + pwd2 + '-error';
    const el = formElement.querySelector(selector);
    if (el && password && password2 && password.value !== password2.value) {
        el.textContent = 'Пароли не совпадают';
        submitButton.addAttributes({'disabled': true});
    }
}

export function getFormValues(name: string): object {
    const values: Record<string, any> = {};
    const formEl = document.getElementsByName(name)[0];
    const inputs = formEl.querySelectorAll('input');
    for (const input of inputs) {
        values[input.name] = input.value;
    }
    return values;
}

export function handleSubmit(event: Event, form: string, submitButton: Block, handler:(arg0: object)=>never) {
    event.preventDefault();
    if (checkFormIsValidAndSetErrors(form)) {
        submitButton.removeAttributes(['disabled']);
        console.log('submitted', form, getFormValues(form));
        handler(getFormValues(form));
    } else {
        submitButton.addAttributes({'disabled': true});
    }
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

export function checkFormIsValidAndSetErrors(form: string): boolean {
    const formEl = document.getElementsByName(form)[0];
    const inputs = formEl.querySelectorAll('input');
    let result = true;
    for (const input of inputs) {
        if (!input.validity.valid) {
            result = false;
            const selector = '#' + input.name + '-error';
            const el = formEl.querySelector(selector);
            if (el !== null) {
                el.textContent = input.validationMessage;
            }
        }
    }
    return result;
}
