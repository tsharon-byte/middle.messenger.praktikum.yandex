import Block from '../../utils/Block';
import {router} from '../../router';

function handleClick(event, href) {
    event.preventDefault();
    router.go(href);
}

class Link extends Block {
    constructor({className, href, ...rest}: LinkProps) {
        super('a', {
            ...rest,
            attrs: {'class': className, 'href': href},
            events: {'click': (event) => handleClick(event, href)}
        });
    }

    render() {
        const template = this.props.children ? this.props.children : 'Ссылка';
        return this.compile(template);
    }

}

export default Link;
