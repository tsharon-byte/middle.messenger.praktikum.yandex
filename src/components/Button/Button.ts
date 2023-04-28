import Block from '../../utils/Block';

class Button extends Block {
    constructor(props: ButtonProps) {
        const {className = 'button', ...rest} = props;
        super('button', {...rest, attrs: {'class': className, type: 'submit'}});
    }

    render() {
        const template = this.props.text ? this.props.text : '';
        return this.compile(template);
    }
}

export default Button;
