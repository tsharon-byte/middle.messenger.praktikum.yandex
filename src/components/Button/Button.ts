import Block from '../../utils/Block';

class Button extends Block {
    constructor({className='button', ...rest}) {
        super('button', {...rest, attrs: {'class': className, type: 'submit', disabled: true}});
    }

    render() {
        const template = this.props.text?this.props.text:'';
        return this.compile(template);
    }
}

export default Button;