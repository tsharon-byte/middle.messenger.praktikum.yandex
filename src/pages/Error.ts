import Block from '../utils/Block';

class Error extends Block {
    constructor(tag, props={}) {
        console.log('Error', props);
        const {error='404', description='Не туда попали'}=props;
        console.log('error', error);
        console.log('description', description);
        super('section', {
            error, description, attrs: {
                'class': 'error'
            }
        });
    }

    render() {
        const template = `<h1 class="error__header">${this.props.error}</h1>
                    <p class="error__description">${this.props.description}</p>
                    <a href="/messenger" class="link error__link">Назад к чатам</a>`;
        return this.compile(template);

    }
}

export default Error;
