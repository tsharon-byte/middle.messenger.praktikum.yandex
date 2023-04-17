import Block from '../utils/Block';

class Error extends Block {
    constructor({error = '404', description = 'Не туда попали'}) {
        super('section', {
            error, description, attrs: {
                'class': 'error'
            }
        });
    }

    render() {
        const template = `<h1 class="error__header">${this.props.error}</h1>
                    <p class="error__description">${this.props.description}</p>
                    <a href="/" class="link error__link">Назад к чатам</a>`;
        return this.compile(template);

    }
}

export default Error;
