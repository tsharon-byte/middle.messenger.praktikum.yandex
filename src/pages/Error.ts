import Block from '../utils/Block';
import Link from '../components/Link/Link';

const link = new Link({
    href: '/messenger',
    className: 'link error__link',
    children: 'Назад к чатам'
});

class Error extends Block {
    constructor(props: ErrorType = {} as ErrorType) {
        const {error = '404', description = 'Не туда попали'} = props;
        super('section', {
            error, description, attrs: {
                'class': 'error'
            },
            link
        });
    }

    render() {
        const template = `<h1 class="error__header">${this.props.error}</h1>
                    <p class="error__description">${this.props.description}</p>
                    <div id="link"></div>`;
        return this.compile(template);

    }
}

export default Error;
